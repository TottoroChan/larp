import { IConfig } from './shared/models/config.model';
import { FilesService } from 'src/app/shared/services/files.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(filesService: FilesService) {
    const config: IConfig = { isMaster: false };

    filesService.initConfig(config);
  }
}