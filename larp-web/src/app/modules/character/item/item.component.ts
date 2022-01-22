import { Resource } from 'src/app/shared/models/resource.model';
import { CharacterService } from 'src/app/shared/services/character.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Character } from 'src/app/shared/models/character.model';
import { MenuItem, MessageService } from 'primeng/api';
import { ToastMessage } from 'src/app/shared/models/toast-message.model';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.less'],
})
export class ItemComponent implements OnInit {
  displayDialog: boolean = false;
  public character!: Character;
  id!: string;
  options: MenuItem[];

  constructor(
    private route: ActivatedRoute,
    private characterService: CharacterService,
    private messageService: MessageService
  ) {
    //this.id = 'a896820b-af15-45ea-b0cd-88d18f7927a5';

    this.options = [];
  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.refresh();
  }

  getResourceBar(resource: Resource) {
    let points = resource.max / resource.step;
    const resourceBar = [];
    let i = 0;
    while (i < points) {
      const point = i * resource.step <= resource.value;
      resourceBar.push(point);
      i++;
    }

    return resourceBar;
  }

  edit() {
    this.displayDialog = true;
  }

  closeDialog(toastMessage: ToastMessage) {
    if (toastMessage) {
      this.showMessage(toastMessage);
    }
    this.displayDialog = false;
    this.refresh();
  }

  private refresh() {
    this.characterService.getOne(this.id).subscribe((response: Character) => {
      this.character = response;
    });
  }

  private showMessage(toastMesssage: ToastMessage) {
    this.messageService.add({
      severity: toastMesssage.severity,
      summary: toastMesssage.summary,
      detail: toastMesssage.detail,
    });
  }
}
