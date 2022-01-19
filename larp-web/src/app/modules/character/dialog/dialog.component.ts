import { Resource } from 'src/app/shared/models/resource.model';
import {
  ToastMessage,
  ToastSeverities,
} from './../../../shared/models/toast-message.model';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Character } from 'src/app/shared/models/character.model';
import { CharacterService } from 'src/app/shared/services/character.service';

@Component({
  selector: 'character-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.less'],
})
export class DialogComponent implements OnInit {
  public characterForm!: FormGroup;
  public resourceForms!: FormGroup[];
  public resourceSteps!: number[];
  @Input() display!: boolean;
  @Input() character!: Character;
  @Output() displayChange = new EventEmitter<ToastMessage>();
  toastMessage!: ToastMessage;

  constructor(
    private characterService: CharacterService,
    private formBuilder: FormBuilder
  ) {
    this.characterForm = this.formBuilder.group({
      id: [null, Validators.required],
      name: [null, Validators.required],
    });
  }

  ngOnInit(): void {}

  ngOnChanges() {
    if (!this.character) {
      this.character = new Character('', '', []);
    }

    this.characterForm.setValue({
      id: this.character.id,
      name: this.character.name,
    });

    if (this.character.resources) {
      this.resourceForms = [];
      this.resourceSteps = [];
      this.character.resources.forEach((resource) => {
        const form = this.formBuilder.group({
          id: [resource.id, Validators.required],
          value: [
            resource.value,
            [
              Validators.required,
              Validators.min(resource.min),
              Validators.max(resource.max),
            ],
          ],
        });
        this.resourceForms.push(form);
      });
    }
  }

  ngOnDestroy() {
    this.displayChange.unsubscribe();
  }

  onClose() {
    this.displayChange.emit(this.toastMessage);
  }

  onSave() {
    var response = null;
    const result = this.characterForm.value;

    const character = new Character(result.id, result.name, []);

    if (result.id) {
      character.id = result.id;
      response = this.Edit(character);
      if (this.character.resources) {
        this.edirResource(this.character.resources)
      }
    } else {
      response = this.Create(character);
    }
  }

  private edirResource(resources: Resource[]) {
    resources.forEach((resource, index) => {
      const newResource = this.resourceForms[index].value;
      if (
        resource.id == newResource.id &&
        resource.value != newResource.value
      ) {
        resource.value = newResource.value;

        this.characterService
          .updateResource(resource)
          .subscribe((response: Resource) => {
            this.toastMessage = new ToastMessage(
              ToastSeverities.Success,
              'Успех!',
              `Ресурс ${resource.name} был обновлен.`
            );

            this.CloseWithToastMessage(this.toastMessage);
          });
      }
    });
  }

  private Edit(character: Character) {
    this.characterService.update(character).subscribe((response: Character) => {
      this.toastMessage = new ToastMessage(
        ToastSeverities.Success,
        'Успех!',
        `Юзер ${character.name} был обновлен.`
      );

      this.CloseWithToastMessage(this.toastMessage);
    });
  }

  private Create(character: Character) {
    this.characterService.create(character).subscribe((response: Character) => {
      this.toastMessage = new ToastMessage(
        ToastSeverities.Success,
        'Успех!',
        `Юзер ${response.name} был создан.`
      );

      this.CloseWithToastMessage(this.toastMessage);
    });
  }

  private CloseWithToastMessage(toastMessage: ToastMessage) {
    this.toastMessage = toastMessage;
    this.onClose();
  }
}
