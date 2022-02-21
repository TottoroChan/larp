import { Octokit } from '@octokit/rest';
import { environment, AppMode } from 'src/environments/environment';
import { Injectable } from '@angular/core';
@Injectable()
export class GithubService {
  //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

  async getData() {
    const octokit = new Octokit({
      auth: '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',
    });

    const path = environment.appMode == AppMode.master ? 'master' : 'player';
    const params = {
      owner: 'izhlarp',
      repo: 'arbor2022',
      path: path,
    };

    params.path = `${path}/rules`;
    const rules: any = await octokit.repos.getContent(params);

    rules.data.forEach(async (item) => {
      const result = await fetch(item.download_url)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          return data;
        });
      console.log(result);
    });

    params.path = `${path}/tools`;
    const tools: any = await octokit.repos.getContent(params);

    tools.data.forEach(async (item) => {
      const result = await fetch(item.download_url)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          return data;
        });
      console.log(result);
    });
  }

  async getFiles(octokit: Octokit, path: string) {
    /*
    const content: any = await octokit.repos.getContent(params);

    content.data.forEach(async (item) => {
      if (item.type == 'dir') {
        const dirPath = item.path;

        this.getFiles(octokit, dirPath);
      } else if (item.type == 'file') {
        const result = await fetch(item.download_url)
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            return data;
          });
        console.log(result);
      }
    }); */
    /*
    const params = {
      owner: 'izhlarp',
      repo: 'arbor2022',
      path: path,
    };

    const repos = this.octokit.rest.repos.downloadZipballArchive({
      owner: 'izhlarp',
      repo: 'arbor2022',
      ref: 'master',
    }).then(response => {
      debugger
    });

    // const content: any = await this.octokit.repos.getContent(params);

    // content.data.forEach((item) => {
    //   if (item.type == 'dir') {
    //     const dirPath = item.path;

    //     this.getFiles(dirPath);
    //   } else if (item.type == 'file') {
    //     debugger;
    //     this.httpClient
    //       .get(item.download_url, {
    //         headers: {
    //           'Content-Type': 'application/json',
    //           'Access-Control-Allow-Origin': 'http://localhost:8100',
    //           'Access-Control-Allow-Methods': 'DELETE, POST, GET, OPTIONS',
    //           'Access-Control-Allow-Headers':
    //             'Content-Type, Authorization, X-Requested-With',
    //         },
    //       })
    //       .subscribe((response) => {
    //         debugger;
    //       });
    //   }
    }); */
  }
}
