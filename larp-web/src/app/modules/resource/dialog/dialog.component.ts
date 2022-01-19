import {
  ToastMessage,
  ToastSeverities,
} from './../../../shared/models/toast-message.model';
import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Resource } from 'src/app/shared/models/resource.model';
import { ResourceService } from 'src/app/shared/services/resource.service';

@Component({
  selector: 'resource-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.less'],
})
export class DialogComponent implements OnInit {
  public resourceForm!: FormGroup;
  @Input() display!: boolean;
  @Input() resource!: Resource;
  @Output() displayChange = new EventEmitter<ToastMessage>();
  toastMessage!: ToastMessage;

  constructor(
    private resourceService: ResourceService,
    private formBuilder: FormBuilder
  ) {
    this.resourceForm = this.formBuilder.group({
      id: [null, Validators.required],
      name: [null, Validators.required],
      description: [null, Validators.required],
      min: [null, Validators.required],
      max: [null, Validators.required],
      step: [null, Validators.required],
    });
  }

  ngOnInit(): void {}

  ngOnChanges() {
    if (!this.resource) {
      this.resource = new Resource('', '', '', 0, 0, 0, 0);
    }

    this.resourceForm.setValue({
      id: this.resource.id,
      name: this.resource.name,
      description: this.resource.description,
      min: this.resource.min,
      max: this.resource.max,
      step: this.resource.step,
    });
  }

  ngOnDestroy() {
    this.displayChange.unsubscribe();
  }

  onClose() {
    this.displayChange.emit(this.toastMessage);
  }

  onSave() {
    var response = null;
    const result = this.resourceForm.value;

    const resource = new Resource(
      result.id,
      result.name,
      result.description,
      result.min,
      result.max,
      result.step,
      result.value
    );

    if (result.id) {
      resource.id = result.id;
      response = this.Edit(resource);
    } else {
      response = this.Create(resource);
    }
  }

  private Edit(resource: Resource) {
    this.resourceService.update(resource).subscribe((response: Resource) => {
      this.toastMessage = new ToastMessage(
        ToastSeverities.Success,
        'Успех!',
        `Юзер ${resource.name} был обновлен.`
      );

      this.CloseWithToastMessage(this.toastMessage);
    });
  }

  private Create(resource: Resource) {
    this.resourceService.create(resource).subscribe((response: Resource) => {
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
