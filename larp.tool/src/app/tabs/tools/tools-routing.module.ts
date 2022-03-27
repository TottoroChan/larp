import { ThiefToolPage } from './components/thief-tool/thief-tool.page';
import { NgModule } from '@angular/core';
import { MadScienceToolPage } from './components/mad-science-tool/mad-science-tool.page';
import { DoctorsToolPage } from './components/doctors-tool/doctors-tool.page';
import { RouterModule, Routes } from '@angular/router';
import { ToolsPage } from './tools.page';

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
