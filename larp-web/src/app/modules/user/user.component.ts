import {
  ToastMessage,
  ToastSeverities,
} from './../../shared/models/toast-message.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { User } from 'src/app/shared/models/user.model';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.less'],
})
export class UserComponent implements OnInit {
  displayDialog: boolean = false;
  users: User[] = [];
  public user!: User;

  loading: boolean = true;

  @ViewChild('dt') table: Table | undefined;

  constructor(
    private userService: UserService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.getUsersList();
  }

  onCreate() {
    this.user = new User('', '', '', '', '', '', '', []);
    this.openDialog();
  }

  onEdit(id: string) {
    this.userService.getOne(id).subscribe((response: User) => {
      this.user = response;
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
    this.getUsersList();
  }

  onRemove(user: User) {
    this.userService.delete(user.id).subscribe((response: User) => {
      const toastMessage = new ToastMessage(
        ToastSeverities.Success,
        'Успех!',
        `Юзер ${user.login} был удален.`
      );

      this.showMessage(toastMessage);
      this.getUsersList();
    });
  }

  private openDialog() {
    this.displayDialog = true;
  }

  private getUsersList() {
    this.loading = true;
    this.userService.get().subscribe((response: User[]) => {
      this.users = response;
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
