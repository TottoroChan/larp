import { FilesService } from '../../shared/services/files.service';
import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HomePage {
  isDataLoading: boolean = false;
  path: string = '';
  path2: string = '';
  filePath: string = '';
  error: any;
  error1: any;
  constructor(private githubService: FilesService) {}

  async syncData() {
    this.isDataLoading = true;
    try {
      await this.githubService.syncGitData();
    } catch (error) {
      this.error1 = error;
    }

    this.isDataLoading = false;
  }
}
