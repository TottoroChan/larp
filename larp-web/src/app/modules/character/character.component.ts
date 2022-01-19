import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Character } from 'src/app/shared/models/character.model';
import { ToastMessage, ToastSeverities } from 'src/app/shared/models/toast-message.model';
import { CharacterService } from 'src/app/shared/services/character.service';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.less'],
})
export class CharacterComponent implements OnInit {
  displayDialog: boolean = false;
  characters: Character[] = [];
  public character!: Character;

  loading: boolean = true;

  constructor(
    private characterService: CharacterService,
    private messageService: MessageService
  ) {
  }

  ngOnInit() {
    this.getCharactersList();
  }

  onCreate() {
    this.character = new Character('', '', []);
    this.openDialog();
  }

  onEdit(id: string) {
    this.characterService.getOne(id).subscribe((response: Character) => {
      this.character = response;
      this.openDialog();
    });
  }

  onDialogClose(toastMessage: ToastMessage) {
    if (toastMessage) {
      this.showMessage(toastMessage);
    }
    this.displayDialog = false;
    this.getCharactersList();
  }

  onRefresh() {
    this.getCharactersList();
  }

  onRemove(character: Character) {
    this.characterService.delete(character.id).subscribe((character: Character) => {
      const toastMessage = new ToastMessage(
        ToastSeverities.Success,
        'Успех!',
        `Юзер ${character.name} был удален.`
      );

      this.showMessage(toastMessage);
      this.getCharactersList();
    });
  }

  private openDialog() {
    this.displayDialog = true;
  }

  private getCharactersList() {
    this.loading = true;
    this.characterService.get().subscribe((response: Character[]) => {
      this.characters = response;
      this.loading = false;
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
