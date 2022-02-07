import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RulesPage } from './rules.page';

import { RulesPageRoutingModule } from './rules-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RulesPageRoutingModule,
    HttpClientModule
  ],
  declarations: [RulesPage]
})
export class RulesPageModule {}
