import { Tool } from '../../tabs/tools/models/tools.model';
import { IConfig } from './../models/config.model';
import { Octokit } from 'octokit';
import { environment, AppMode } from 'src/environments/environment';
import { Injectable, Type } from '@angular/core';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';

@Injectable()
export class FilesService {
  async syncGitData() {
    try {
      const octokit = new Octokit({
        auth: environment.gitToken,
      });

      const config = await this.readConfig();
      const path = config.isMaster ? 'master' : 'player'; //environment.appMode == AppMode.master ? 'master' : 'player';
      await this.getFilesFromFolder(octokit, `${path}/rules`);

      await this.getFilesFromFolder(octokit, `${path}/tools`);
    } catch (error) {}
  }

  private async getFilesFromFolder(octokit: Octokit, contentFolder: string) {
    try {
      const params = {
        owner: 'izhlarp',
        repo: 'arbor2022',
        path: contentFolder,
      };

      const tools: any = await octokit.rest.repos.getContent(params);

      tools.data.forEach(async (item) => {
        params.path = item.path;
        const file: any = await octokit.rest.repos.getContent(params);
        const content = file.data.content.replace('\n', '');
        const contentJSON = this.decodeBase64(content);

        await this.CreateFolderIfNotExist(`content/${contentFolder}`);

        await Filesystem.writeFile({
          path: `content/${contentFolder}/${file.data.name}`,
          data: contentJSON,
          directory: Directory.External,
          encoding: Encoding.UTF8,
        });
      });
    } catch (error) {}
  }

  private async CreateFolderIfNotExist(folderPath: string) {
    try {
      await Filesystem.mkdir({
        path: `${folderPath}`,
        directory: Directory.External,
        recursive: true,
      });
    } catch (error) {}
  }

  private decodeBase64(base64) {
    const text = atob(base64);
    const length = text.length;
    const bytes = new Uint8Array(length);
    for (let i = 0; i < length; i++) {
      bytes[i] = text.charCodeAt(i);
    }
    const decoder = new TextDecoder(); // default is utf-8
    return decoder.decode(bytes);
  }

  async readLocalData<Type>(contentFolder?: string, fileName?: string) {
    const config = await this.readConfig();
    const path = config.isMaster ? 'master' : 'player'; //environment.appMode == AppMode.master ? 'master' : 'player';

    let result: Type[] = [];
    try {
      if (fileName) {
        const fileContent = await Filesystem.readFile({
          path: `content/${path}/${contentFolder}/${fileName}`,
          directory: Directory.External,
          encoding: Encoding.UTF8,
        });
        result.push(JSON.parse(fileContent.data) as Type);
        return result;
      } else {
        const dir = await Filesystem.readdir({
          path: `content/${path}/${contentFolder}`,
          directory: Directory.External,
        });

        dir.files.forEach((file) => {
          Filesystem.readFile({
            path: `content/${path}/${contentFolder}/${file}`,
            directory: Directory.External,
            encoding: Encoding.UTF8,
          }).then((fileContent) => {
            const data = JSON.parse(fileContent.data) as Type;
            result.push(data);
          });
        });
        return result;
      }
    } catch (error) {
      return null;
    }
  }

  async readToolList() {
    const config = await this.readConfig();
    const path = config.isMaster ? 'master' : 'player'; //environment.appMode == AppMode.master ? 'master' : 'player';

    let result: Tool[] = [];

    const tools = await Filesystem.readdir({
      path: `content/${path}/tools`,
      directory: Directory.External,
    });

    await tools.files.forEach((file) => {
      Filesystem.readFile({
        path: `content/${path}/tools/${file}`,
        directory: Directory.External,
        encoding: Encoding.UTF8,
      }).then((fileContent) => {
        const data = JSON.parse(fileContent.data);
        const tool = new Tool();
        tool.name = data.name;
        tool.path = data.path;

        result.push(tool);
      });
    });

    return result;
  }

  configFilePath = 'content/config.cfg';

  async initConfig(config: IConfig) {
    await this.CreateFolderIfNotExist('content');

    try {
      await Filesystem.readFile({
        path: this.configFilePath,
        directory: Directory.External,
        encoding: Encoding.UTF8,
      });
    } catch (e) {
      await Filesystem.writeFile({
        path: this.configFilePath,
        data: JSON.stringify(config),
        directory: Directory.External,
        encoding: Encoding.UTF8,
      });
    }
  }

  async writeConfig(config: IConfig) {
    await Filesystem.writeFile({
      path: this.configFilePath,
      data: JSON.stringify(config),
      directory: Directory.External,
      encoding: Encoding.UTF8,
    });
  }

  async readConfig(): Promise<IConfig> {
    const config = await Filesystem.readFile({
      path: this.configFilePath,
      directory: Directory.External,
      encoding: Encoding.UTF8,
    });
    return JSON.parse(config.data);
  }
}
