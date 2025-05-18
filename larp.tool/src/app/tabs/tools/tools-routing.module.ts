import { ThiefToolPage } from '@app/tabs/tools/components/thief-tool/thief-tool.page';
import { NgModule } from '@angular/core';
import { MadScienceToolPage } from '@app/tabs/tools/components/mad-science-tool/mad-science-tool.page';
import { DoctorsToolPage } from '@app/tabs/tools/components/doctors-tool/doctors-tool.page';
import { RouterModule, Routes } from '@angular/router';
import { ToolsPage } from '@app/tabs/tools/tools.page';

const routes: Routes = [
  {
    path: '',
    component: ToolsPage,
  },
  {
    path: 'doctors',
    component: DoctorsToolPage,
  },
  {
    path: 'mad-science',
    component: MadScienceToolPage,
  },
  {
    path: 'thief-tool',
    component: ThiefToolPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class ToolsPageRoutingModule {}
