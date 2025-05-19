import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HomePageRoutingModule } from '@app/tabs/pathologic/pathologic-routing.module';
import { PathologicPageComponent } from '@app/tabs/pathologic/pathologic.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HomePageRoutingModule,
  ],
  declarations: [PathologicPageComponent],
  providers: [],
})
export class PathologicPageModule {}
