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

      const path = environment.appMode == AppMode.master ? 'master' : 'player';
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

        await this.CreateFolderIfNotExist(contentFolder);

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
        path: `content/${folderPath}`,
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

  async readDataFromFiles(contentFolder : string){
    
  }
}
