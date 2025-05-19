import { Router } from '@angular/router';
import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { FilesService } from '@app/shared/services/files.service';
import { Tool } from '@app/tabs/tools/models/tools.model';

@Component({
  selector: 'app-tools',
  templateUrl: 'tools.page.html',
  styleUrls: ['tools.page.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ToolsPageComponent {
  noContent: boolean;
  listOfTools: Tool[];
  constructor(private filesService: FilesService, private router: Router) {}

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

  goHome(){
    this.router.navigateByUrl(`tabs/home`);
  }
}
