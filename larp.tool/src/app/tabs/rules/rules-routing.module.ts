import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RuleItemPage } from '@app/tabs/rules/components/rule-item/rule-item.page';
import { RulesPage } from '@app/tabs/rules/rules.page';

const routes: Routes = [
  {
    path: '',
    component: RulesPage,
  },
  {
    path: 'item',
    component: RuleItemPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RulesPageRoutingModule {}
