import {
  Directory,
  Encoding,
  Filesystem,
  ReadFileResult,
} from '@capacitor/filesystem';
import { IConfig } from './../../shared/models/config.model';
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

  constructor(private filesService: FilesService) {}

  async syncData() {
    this.isDataLoading = true;
    await this.filesService.syncGitData();
    this.isDataLoading = false;
  }
}
