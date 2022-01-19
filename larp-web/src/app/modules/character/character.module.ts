import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CharacterComponent } from './character.component';
import { RouterModule, Routes } from '@angular/router';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

import { CharacterService } from 'src/app/shared/services/character.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogComponent } from './dialog/dialog.component';
import { InputNumberModule } from 'primeng/inputnumber';

const appRoutes: Routes = [{ path: '', component: CharacterComponent }];

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
    DialogModule,
    InputNumberModule
  ],
  declarations: [CharacterComponent, DialogComponent],
  providers: [CharacterService, MessageService],
})
export class CharacterModule {}
