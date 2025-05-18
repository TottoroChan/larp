import { Config } from './shared/models/config.model';
import { FilesService } from 'src/app/shared/services/files.service';
import { Component, OnInit } from '@angular/core';
import { appSettings } from './app.config';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private filesService: FilesService) {}

  ngOnInit(): void {
    if(appSettings.isMobileApp){
      const config: Config = {
        isMaster: false,
        lastSyncDate: new Date(-8640000000000000),
      };

      this.filesService.initConfig(config);
    }
  }
}
