import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RuleItemPageComponent } from '@app/tabs/rules/components/rule-item/rule-item.page';
import { RulesPageComponent } from '@app/tabs/rules/rules.page';

const routes: Routes = [
  {
    path: '',
    component: RulesPageComponent,
  },
  {
    path: 'item',
    component: RuleItemPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RulesPageRoutingModule {}
