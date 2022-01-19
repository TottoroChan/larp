import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Resource } from 'src/app/shared/models/resource.model';
import {
  ToastMessage,
  ToastSeverities,
} from 'src/app/shared/models/toast-message.model';
import { ResourceService } from 'src/app/shared/services/resource.service';

@Component({
  selector: 'app-resource',
  templateUrl: './resource.component.html',
  styleUrls: ['./resource.component.less'],
})
export class ResourceComponent implements OnInit {
  displayDialog: boolean = false;
  resources: Resource[] = [];
  public resource!: Resource;

  loading: boolean = true;

  constructor(
    private resourceService: ResourceService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.getResourcesList();
  }

  onCreate() {
    this.resource = new Resource('', '', '', 0, 0, 0, 0);
    this.openDialog();
  }

  onEdit(id: string) {
    this.resourceService.getOne(id).subscribe((response: Resource) => {
      this.resource = response;
      this.openDialog();
    });
  }

  onDialogClose(toastMessage: ToastMessage) {
    if (toastMessage) {
      this.showMessage(toastMessage);
    }
    this.displayDialog = false;
  }

  onRefresh() {
    this.getResourcesList();
  }

  onRemove(resource: Resource) {
    this.resourceService.delete(resource.id).subscribe((response: Resource) => {
      const toastMessage = new ToastMessage(
        ToastSeverities.Success,
        'Успех!',
        `Юзер ${resource.name} был удален.`
      );

      this.showMessage(toastMessage);
      this.getResourcesList();
    });
  }

  private openDialog() {
    this.displayDialog = true;
  }

  private getResourcesList() {
    this.loading = true;
    this.resourceService.get().subscribe((response: Resource[]) => {
      this.resources = response;
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
