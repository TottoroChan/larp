import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HomePageRoutingModule } from './pathologic-routing.module';
import { PathologicPage } from './pathologic.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HomePageRoutingModule,
  ],
  declarations: [PathologicPage],
  providers: [],
})
export class PathologicPageModule {}
