import { ButtonModule } from 'primeng/button';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CharacterComponent } from './character.component';
import { RouterModule, Routes } from '@angular/router';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { CardModule } from 'primeng/card';
import { MessageService } from 'primeng/api';
import { DropdownModule } from 'primeng/dropdown';

import { CharacterService } from 'src/app/shared/services/character.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
    DropdownModule,
    CardModule,
  ],
  declarations: [CharacterComponent],
  providers: [CharacterService, MessageService],
})
export class CharacterModule {}
