import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PathologicPageComponent } from '@app/tabs/pathologic/pathologic.page';
import { SymptomsTableComponent } from '@app/tabs/pathologic/components/symptoms-table/symptoms-table.component';
import { MedicineComponent } from '@app/tabs/pathologic/components/medicine/medicine.component';
import { PreviewComponent } from '@app/tabs/pathologic/components/preview/preview.component';

const routes: Routes = [
  {
    path: 'wizard',
    component: PathologicPageComponent,
    children: [
      { path: 'step1', component: SymptomsTableComponent, data: { layer: 0 } },
      { path: 'step2', component: SymptomsTableComponent, data: { layer: 1 } },
      { path: 'step3', component: SymptomsTableComponent, data: { layer: 2 } },
      { path: 'step4', component: MedicineComponent },
      { path: 'step5', component: PreviewComponent },
      { path: '', redirectTo: 'step5', pathMatch: 'full' },
    ],
  },
  { path: '', redirectTo: 'wizard', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
