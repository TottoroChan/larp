import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Resource } from 'src/app/shared/models/resource.model';
import { ResourceService } from 'src/app/shared/services/resource.service';

@Component({
  selector: 'app-resource',
  templateUrl: './resource.component.html',
  styleUrls: ['./resource.component.less'],
})
export class ResourceComponent implements OnInit {
  resources: Resource[] = [];
  public resourceForm: FormGroup;
  public editResourceForm!: FormGroup;
  public resourcesList: { name: string; code: string }[] = [];
  public selectedResource!: { name: string; code: string };
  public oneResource!: Resource;

  loading: boolean = true;

  @ViewChild('dt') table: Table | undefined;

  constructor(
    private resourceService: ResourceService,
    private formBuilder: FormBuilder,
    private messageService: MessageService
  ) {
    this.resourceForm = formBuilder.group({
      name: [null, Validators.required],
      description: [null, Validators.required],
      min: [null, Validators.required],
      max: [null, Validators.required],
      step: [null, Validators.required],
    });
  }

  ngOnInit() {
    this.getResourcesList();
  }

  onRefresh() {
    this.getResourcesList();
  }

  onRemove(resource: Resource) {
    this.resourceService.delete(resource.id).subscribe((response: Resource) => {
      this.showMessage(
        'success',
        'Успех!',
        `Юзер ${resource.name} был удален.`
      );
      this.getResourcesList();
    });
  }

  onEdit(resource: Resource) {
    this.editResourceForm = this.formBuilder.group({
      id: [resource.id, Validators.required],
      name: [resource.name, Validators.required],
      description: [resource.description, Validators.required],
      min: [resource.min, Validators.required],
      max: [resource.max, Validators.required],
      step: [resource.step, Validators.required],
    });
  }

  onEditResource() {
    const result = this.editResourceForm.value;

    const resource = new Resource(
      result.id,
      result.name,
      result.description,
      result.min,
      result.max,
      result.step,
      result.value
    );

    this.resourceService.update(resource).subscribe((response: Resource) => {
      this.showMessage(
        'success',
        'Успех!',
        `Юзер ${resource.name} был обновлен.`
      );
      this.getResourcesList();
    });
  }

  onResourceChange() {
    this.resourceService
      .getOne(this.selectedResource.code)
      .subscribe((response: Resource) => {
        this.oneResource = response;
      });
  }

  onAddResource() {
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

    this.resourceService.create(resource).subscribe((response: Resource) => {
      this.resourceForm.reset();
      this.showMessage(
        'success',
        'Успех!',
        `Юзер ${response.name} был создан.`
      );
      this.getResourcesList();
    });
  }

  private showMessage(severity: string, summary: string, detail: string) {
    this.messageService.add({
      severity: severity,
      summary: summary,
      detail: detail,
    });
  }

  private getResourcesList() {
    this.loading = true;
    this.resourceService.get().subscribe((response: Resource[]) => {
      this.resources = response;

      this.resources.forEach((resource) => {
        this.resourcesList.push({ name: resource.name, code: resource.id });
      });

      this.loading = false;
    });
  }
}
