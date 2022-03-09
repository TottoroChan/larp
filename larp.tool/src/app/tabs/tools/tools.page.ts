import { Component, ViewEncapsulation } from '@angular/core';
import { FilesService } from 'src/app/shared/services/files.service';
import { Tool } from './models/tools.model';

@Component({
  selector: 'app-tools',
  templateUrl: 'tools.page.html',
  styleUrls: ['tools.page.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ToolsPage {
  noContent: boolean;
  listOfTools: Tool[];
  constructor(private filesService: FilesService) {}

  ionViewDidEnter() {
    try {
      this.filesService.readToolList().then((response) => {
        if (response) {
          this.noContent = false;

          this.listOfTools = response;
        } else {
          this.noContent = true;
        }
      });
    } catch (error) {}
  }

  ionViewDidLeave() {
    this.listOfTools = [];
    this.noContent = false;
  }
}
