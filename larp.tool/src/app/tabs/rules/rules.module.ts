import { RuleItemPage } from './components/rule-item/rule-item.page';
import { IonicModule } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RulesPage } from './rules.page';

import { RulesPageRoutingModule } from './rules-routing.module';
import { FilesService } from 'src/app/shared/services/files.service';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RulesPageRoutingModule,
    HttpClientModule,
  ],
  declarations: [RulesPage, RuleItemPage],
  providers: [FilesService],
})
export class RulesPageModule {}
