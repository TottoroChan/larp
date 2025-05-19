import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PathologicPageComponent } from '@app/tabs/pathologic/pathologic.page';

const routes: Routes = [
  {
    path: '',
    component: PathologicPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
