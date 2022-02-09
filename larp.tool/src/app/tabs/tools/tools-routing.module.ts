import { DoctorsToolPage } from './components/doctors-tool/doctors-tool.page';
import { NgModule } from '@angular/core';
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
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ToolsPageRoutingModule {}
