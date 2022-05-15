import { Injectable } from '@angular/core';
import { Tool } from '../../tabs/tools/models/tools.model';
import { Config } from './../models/config.model';
import { Octokit } from 'octokit';
import { environment } from 'src/environments/environment';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';

@Injectable()
export class FilesService {
  private contentFolder = 'content';
  private configFile = '.config.cfg';
  private repoPaths = ['master', 'player'];
  private octokitParams = {
    owner: 'izhlarp',
    repo: 'arbor2022',
    path: '',
  };

  async getGitLastModifiedDate(octokit): Promise<Date> {
    if (!octokit) {
      octokit = new Octokit({
        auth: environment.gitToken,
      });
    }

    const path = await this.getRootPath();
    this.octokitParams.path = path;

    let repoContent: any = await octokit.rest.repos.getContent(
      this.octokitParams
    );

    const lastModifiedDate = new Date(repoContent.headers['last-modified']);

    return lastModifiedDate;
  }

  async syncGitData() {
    try {
      const octokit = new Octokit({
        auth: environment.gitToken,
      });

      const config = await this.readConfig();

      this.repoPaths.forEach(async (path) => {
        await this.getFilesFromFolder(octokit, `${path}/rules`);

        await this.getFilesFromFolder(octokit, `${path}/tools`);
      });

      const newConfig = {
        isMaster: config.isMaster,
        lastSyncDate: new Date(),
      };
      this.writeConfig(newConfig);
    } catch (error) {}
  }

  private async getFilesFromFolder(octokit: Octokit, repoFolder: string) {
    this.octokitParams.path = repoFolder;

    let folderContent: any = await octokit.rest.repos.getContent(
      this.octokitParams
    );

    await this.createFolder(`${this.contentFolder}/${repoFolder}`);

    for (let index = 0; index < folderContent.data.length; index++) {
      const item = folderContent.data[index];

      this.octokitParams.path = item.path;
      const file: any = await octokit.rest.repos.getContent(this.octokitParams);

      const content = file.data.content.replace('\n', '');
      const contentJSON = this.decodeBase64(content);

      await Filesystem.writeFile({
        path: `${this.contentFolder}/${repoFolder}/${file.data.name}`,
        data: contentJSON,
        directory: Directory.External,
        encoding: Encoding.UTF8,
      });
    }
  }

  private async createFolder(folderPath: string) {
    try {
      const folder = await Filesystem.readdir({
        path: folderPath,
        directory: Directory.External,
      });

      if (folder) {
        // await Filesystem.rmdir({
        //   path: folderPath,
        //   directory: Directory.External,
        //   recursive: true,
        // });
      }
    } catch (error) {
    } finally {
      await Filesystem.mkdir({
        path: folderPath,
        directory: Directory.External,
        recursive: true,
      });
    }
  }

  private decodeBase64(base64) {
    const text = atob(base64);
    const length = text.length;
    const bytes = new Uint8Array(length);

    for (let i = 0; i < length; i++) {
      bytes[i] = text.charCodeAt(i);
    }

    const decoder = new TextDecoder();

    return decoder.decode(bytes);
  }

  async readLocalData<Type>(contentFolder?: string, fileName?: string) {
    let result: Type[] = null;

    try {
      const path = await this.getRootPath();

      if (fileName) {
        result = await this.readFileByName<Type>(
          `${this.contentFolder}/${path}/${contentFolder}/${fileName}`
        );
      } else {
        result = await this.readFilesFromFolder<Type>(
          `${this.contentFolder}/${path}/${contentFolder}`
        );
      }
    } catch (error) {
    } finally {
      return result;
    }
  }

  private async readFilesFromFolder<Type>(path: string) {
    let result: Type[] = [];

    const dir = await Filesystem.readdir({
      path: path,
      directory: Directory.External,
    });

    for (let index = 0; index < dir.files.length; index++) {
      const file = dir.files[index];

      const fileContent = await Filesystem.readFile({
        path: `${path}/${file}`,
        directory: Directory.External,
        encoding: Encoding.UTF8,
      });

      const data = JSON.parse(fileContent.data) as Type;

      result.push(data);
    }

    return result;
  }

  private async readFileByName<Type>(path: string) {
    let result: Type[] = [];

    const fileContent = await Filesystem.readFile({
      path: path,
      directory: Directory.External,
      encoding: Encoding.UTF8,
    });

    const data = JSON.parse(fileContent.data) as Type;

    result.push(data);

    return result;
  }

  async readToolList() {
    let result: Tool[] = null;

    try {
      const path = await this.getRootPath();

      const tools = await Filesystem.readdir({
        path: `${this.contentFolder}/${path}/tools`,
        directory: Directory.External,
      });

      if (tools.files.length) {
        result = [];

        for (let index = 0; index < tools.files.length; index++) {
          const file = tools.files[index];

          const fileContent = await Filesystem.readFile({
            path: `${this.contentFolder}/${path}/tools/${file}`,
            directory: Directory.External,
            encoding: Encoding.UTF8,
          });

          const data = JSON.parse(fileContent.data);

          const tool: Tool = {
            name: data.name,
            path: data.path,
          };

          result.push(tool);
        }
      }
    } catch (error) {
    } finally {
      return result;
    }
  }

  async initConfig(config: Config) {
    try {
      await Filesystem.readFile({
        path: this.configFile,
        directory: Directory.External,
        encoding: Encoding.UTF8,
      });
    } catch (e) {
      await Filesystem.writeFile({
        path: this.configFile,
        data: JSON.stringify(config),
        directory: Directory.External,
        encoding: Encoding.UTF8,
      });
    }
  }

  async writeConfig(config: Config) {
    await Filesystem.writeFile({
      path: this.configFile,
      data: JSON.stringify(config),
      directory: Directory.External,
      encoding: Encoding.UTF8,
    });
  }

  async readConfig(): Promise<Config> {
    const config = await Filesystem.readFile({
      path: this.configFile,
      directory: Directory.External,
      encoding: Encoding.UTF8,
    });

    return JSON.parse(config.data);
  }

  private async getRootPath() {
    const config = await this.readConfig();
    const path = config.isMaster ? 'master' : 'player';

    return path;
  }
}
