import { Config } from './shared/models/config.model';
import { FilesService } from 'src/app/shared/services/files.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private filesService: FilesService) {}

  ngOnInit(): void {
    const config: Config = { isMaster: false };

    this.filesService.initConfig(config);
  }
}
