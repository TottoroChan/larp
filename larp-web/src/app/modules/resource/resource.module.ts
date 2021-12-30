import { ButtonModule } from 'primeng/button';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResourceComponent } from './resource.component';
import { RouterModule, Routes } from '@angular/router';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { CardModule } from 'primeng/card';
import { MessageService } from 'primeng/api';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';

import { ResourceService } from 'src/app/shared/services/resource.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
    DropdownModule,
    CardModule,
    InputNumberModule
  ],
  declarations: [ResourceComponent],
  providers: [ResourceService, MessageService],
})
export class ResourceModule {}
