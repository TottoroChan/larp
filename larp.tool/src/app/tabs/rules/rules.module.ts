import { HighlightPipe } from '@app/tabs/rules/pipes/highlight.pipe';
import { RuleItemPage } from '@app/tabs/rules/components/rule-item/rule-item.page';
import { IonicModule } from '@ionic/angular';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RulesPage } from '@app/tabs/rules/rules.page';

import { RulesPageRoutingModule } from '@app/tabs/rules/rules-routing.module';
import { FilesService } from '@app/shared/services/files.service';

@NgModule({ declarations: [RulesPage, RuleItemPage, HighlightPipe], imports: [IonicModule,
        CommonModule,
        FormsModule,
        RulesPageRoutingModule], providers: [FilesService, provideHttpClient(withInterceptorsFromDi())] })
export class RulesPageModule {}
