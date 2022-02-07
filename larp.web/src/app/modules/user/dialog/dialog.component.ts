import {
  ToastMessage,
  ToastSeverities,
} from './../../../shared/models/toast-message.model';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from 'src/app/shared/models/user.model';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'user-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.less'],
})
export class DialogComponent implements OnInit {
  public userForm!: FormGroup;
  @Input() display!: boolean;
  @Input() user!: User;
  @Output() displayChange = new EventEmitter<ToastMessage>();
  toastMessage!: ToastMessage;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder
  ) {
    this.userForm = this.formBuilder.group({
      id: [null, Validators.required],
      login: [null, Validators.required],
      name: [null, Validators.required],
      surname: [null, Validators.required],
      password: [null, Validators.required],
    });
  }

  ngOnInit(): void {}

  ngOnChanges() {
    if (!this.user) {
      this.user = new User('', '', '', '', '', '', '', []);
    }

    this.userForm.setValue({
      id: this.user.id,
      login: this.user.login,
      name: this.user.name,
      surname: this.user.surname,
      password: this.user.password,
    });
  }

  ngOnDestroy() {
    this.displayChange.unsubscribe();
  }

  close() {
    this.displayChange.emit(this.toastMessage);
  }

  save() {
    var response = null;
    const result = this.userForm.value;

    const user = new User(
      result.id,
      result.login,
      result.name,
      result.surname,
      result.password,
      result.salt,
      result.roles,
      result.characters
    );

    if (result.id) {
      user.id = result.id;
      response = this.edit(user);
    } else {
      response = this.create(user);
    }
  }

  private edit(user: User) {
    this.userService.update(user).subscribe((response: User) => {
      this.toastMessage = new ToastMessage(
        ToastSeverities.Success,
        'Успех!',
        `Юзер ${user.login} был обновлен.`
      );

      this.closeWithToastMessage(this.toastMessage);
    });
  }

  private create(user: User) {
    this.userService.create(user).subscribe((response: User) => {
      this.toastMessage = new ToastMessage(
        ToastSeverities.Success,
        'Успех!',
        `Юзер ${response.login} был создан.`
      );

      this.closeWithToastMessage(this.toastMessage);
    });
  }

  private closeWithToastMessage(toastMessage: ToastMessage) {
    this.toastMessage = toastMessage;
    this.close();
  }
}
