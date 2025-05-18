import { HighlightPipe } from './pipes/highlight.pipe';
import { RuleItemPage } from './components/rule-item/rule-item.page';
import { IonicModule } from '@ionic/angular';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RulesPage } from './rules.page';

import { RulesPageRoutingModule } from './rules-routing.module';
import { FilesService } from 'src/app/shared/services/files.service';

@NgModule({ declarations: [RulesPage, RuleItemPage, HighlightPipe], imports: [IonicModule,
        CommonModule,
        FormsModule,
        RulesPageRoutingModule], providers: [FilesService, provideHttpClient(withInterceptorsFromDi())] })
export class RulesPageModule {}
