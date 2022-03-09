import { Tool } from '../../tabs/tools/models/tools.model';
import { IConfig } from './../models/config.model';
import { Octokit } from 'octokit';
import { environment, AppMode } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';

@Injectable()
export class FilesService {
  async syncGitData() {
    try {
      const octokit = new Octokit({
        auth: environment.gitToken,
      });

      const path = await this.getRootPath();

      await this.getFilesFromFolder(octokit, `${path}/rules`);

      await this.getFilesFromFolder(octokit, `${path}/tools`);
    } catch (error) {}
  }

  private async getFilesFromFolder(octokit: Octokit, contentFolder: string) {
    const params = {
      owner: 'izhlarp',
      repo: 'arbor2022',
      path: contentFolder,
    };

    let folderContent: any = await octokit.rest.repos.getContent(params);

    for (let index = 0; index < folderContent.data.length; index++) {
      const item = folderContent.data[index];

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
    }
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

    const decoder = new TextDecoder();

    return decoder.decode(bytes);
  }

  async readLocalData<Type>(contentFolder?: string, fileName?: string) {
    let result: Type[] = [];

    const path = await this.getRootPath();

    if (fileName) {
      result = await this.readFileByName<Type>(
        `content/${path}/${contentFolder}/${fileName}`
      );
    } else {
      result = await this.readFilesFromFolder<Type>(
        `content/${path}/${contentFolder}`
      );
    }

    return result;
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
    let result: Tool[] = [];

    const path = await this.getRootPath();

    const tools = await Filesystem.readdir({
      path: `content/${path}/tools`,
      directory: Directory.External,
    });

    for (let index = 0; index < tools.files.length; index++) {
      const file = tools.files[index];

      const fileContent = await Filesystem.readFile({
        path: `content/${path}/tools/${file}`,
        directory: Directory.External,
        encoding: Encoding.UTF8,
      });

      const data = JSON.parse(fileContent.data);

      const tool = new Tool();
      tool.name = data.name;
      tool.path = data.path;

      result.push(tool);
    }

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

  private async getRootPath() {
    const config = await this.readConfig();
    const path = config.isMaster ? 'master' : 'player';

    return path;
  }
}
