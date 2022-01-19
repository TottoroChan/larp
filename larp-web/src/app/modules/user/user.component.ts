import {
  ToastMessage,
  ToastSeverities,
} from './../../shared/models/toast-message.model';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
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


  constructor(
    private userService: UserService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.getUsersList();
  }

  create() {
    this.user = new User('', '', '', '', '', '', '', []);
    this.openDialog();
  }

  edit(id: string) {
    this.userService.getOne(id).subscribe((response: User) => {
      this.user = response;
      this.openDialog();
    });
  }

  closeDialog(toastMessage: ToastMessage) {
    if (toastMessage) {
      this.showMessage(toastMessage);
    }
    this.displayDialog = false;
  }

  refresh() {
    this.getUsersList();
  }

  remove(user: User) {
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
