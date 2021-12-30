import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Character } from 'src/app/shared/models/character.model';
import { CharacterService } from 'src/app/shared/services/character.service';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.less'],
})
export class CharacterComponent implements OnInit {
  characters: Character[] = [];
  public characterForm: FormGroup;
  public editcharacterForm!: FormGroup;
  public charactersList: { name: string; code: string; }[] = [];
  public selectedcharacter!: { name: string; code: string; };
  public onecharacter!: Character;

  loading: boolean = true;

  @ViewChild('dt') table: Table | undefined;

  constructor(
    private characterService: CharacterService,
    private formBuilder: FormBuilder,
    private messageService: MessageService
  ) {
    this.characterForm = formBuilder.group({
      name: [null, Validators.required],
    });
  }

  ngOnInit() {
    this.getcharactersList();
  }

  onRefresh() {
    this.getcharactersList();
  }

  onRemove(character: Character) {
    this.characterService.delete(character.id).subscribe((response: Character) => {
      this.showMessage('success', 'Успех!', `Юзер ${character.name} был удален.`)
      this.getcharactersList();
    });
  }

  onEdit(character: Character) {
    this.editcharacterForm = this.formBuilder.group({
      id: [character.id, Validators.required ],
      name: [character.name, Validators.required],
    });
  }


  onEditcharacter() {
    const result = this.editcharacterForm.value;

    const character = new Character(
      result.id,
      result.name,
      []
    );
    character.id = result.id;
    
    this.characterService.update(character).subscribe((response: Character) => {
      this.showMessage('success', 'Успех!', `Юзер ${character.name} был обновлен.`)
      this.getcharactersList();
    });
  }
  oncharacterChange() {
    this.characterService.getOne(this.selectedcharacter.code).subscribe((response: Character) => {
      this.onecharacter = response;
    });
  }

  onAddcharacter() {
    const result = this.characterForm.value;

    const character = new Character(
      '',
      result.name,
      []
    );

    this.characterService.create(character).subscribe((response: Character) => {
      this.characterForm.reset();
      this.showMessage('success', 'Успех!', `Юзер ${response.name} был создан.`)
      this.getcharactersList();
    });
  }

  private showMessage(severity: string, summary: string, detail: string) {
    this.messageService.add({
      severity: severity,
      summary: summary,
      detail: detail,
    });
  }

  private getcharactersList() {
    this.loading = true;
    this.characterService.get().subscribe((response: Character[]) => {
      this.characters = response;
      this.charactersList = [];
      this.characters.forEach(character => {
        this.charactersList.push({name: character.name, code: character.id})
      });

      this.loading = false;
    });
  }
}
