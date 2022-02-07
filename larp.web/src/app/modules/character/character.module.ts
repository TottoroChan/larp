import { ItemComponent } from './item/item.component';
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
import { InputNumberModule } from 'primeng/inputnumber';
import { DialogComponent } from './dialog/dialog.component';
import {SplitButtonModule} from 'primeng/splitbutton';


import { CharacterService } from 'src/app/shared/services/character.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const appRoutes: Routes = [
  { path: '', component: CharacterComponent },
  { path: 'info/:id', component: ItemComponent },
];

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
    InputNumberModule,
    SplitButtonModule
  ],
  declarations: [CharacterComponent, DialogComponent, ItemComponent],
  providers: [CharacterService, MessageService],
})
export class CharacterModule {}
