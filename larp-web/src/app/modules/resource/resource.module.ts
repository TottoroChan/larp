import { ButtonModule } from 'primeng/button';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResourceComponent } from './resource.component';
import { RouterModule, Routes } from '@angular/router';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { InputNumberModule } from 'primeng/inputnumber';
import { DialogModule } from 'primeng/dialog';

import { ResourceService } from 'src/app/shared/services/resource.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogComponent } from './dialog/dialog.component';

const appRoutes: Routes = [{ path: '', component: ResourceComponent }];

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
    InputNumberModule,
    DialogModule,
  ],
  declarations: [ResourceComponent, DialogComponent],
  providers: [ResourceService, MessageService],
})
export class ResourceModule {}
