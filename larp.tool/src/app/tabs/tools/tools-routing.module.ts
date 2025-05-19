import { ThiefToolPageComponent } from '@app/tabs/tools/components/thief-tool/thief-tool.page';
import { NgModule } from '@angular/core';
import { MadScienceToolPageComponent } from '@app/tabs/tools/components/mad-science-tool/mad-science-tool.page';
import { DoctorsToolPageComponent } from '@app/tabs/tools/components/doctors-tool/doctors-tool.page';
import { RouterModule, Routes } from '@angular/router';
import { ToolsPageComponent } from '@app/tabs/tools/tools.page';

const routes: Routes = [
  {
    path: '',
    component: ToolsPageComponent,
  },
  {
    path: 'doctors',
    component: DoctorsToolPageComponent,
  },
  {
    path: 'mad-science',
    component: MadScienceToolPageComponent,
  },
  {
    path: 'thief-tool',
    component: ThiefToolPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class ToolsPageRoutingModule {}
