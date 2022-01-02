import { ButtonModule } from 'primeng/button';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { RouterModule, Routes } from '@angular/router';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import {DialogModule} from 'primeng/dialog';

import { UserService } from 'src/app/shared/services/user.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogComponent } from './dialog/dialog.component';

const appRoutes: Routes = [{ path: '', component: UserComponent }];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(appRoutes),
    TableModule,
    InputTextModule,
    ButtonModule,
    FormsModule,
    ReactiveFormsModule,
    ToastModule,
    DialogModule
  ],
  declarations: [UserComponent, DialogComponent],
  providers: [UserService, MessageService],
})
export class UserModule {}
