import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PathologicPageComponent } from '@app/tabs/pathologic/pathologic.page';
import { SymptomsTableComponent } from '@app/tabs/pathologic/components/symptoms-table/symptoms-table.component';
import { MedicineComponent } from '@app/tabs/pathologic/components/medicine/medicine.component';
import { PreviewComponent } from '@app/tabs/pathologic/components/preview/preview.component';
import { ResultComponent } from '@app/tabs/pathologic/components/result/result.component';

const routes: Routes = [
  {
    path: 'wizard',
    component: PathologicPageComponent,
    children: [
      { path: 'step1', component: SymptomsTableComponent},
      { path: 'step2', component: MedicineComponent },
      { path: 'step3', component: PreviewComponent },
      { path: 'result', component: ResultComponent },
      { path: '', redirectTo: 'step1', pathMatch: 'full' },
    ],
  },
  { path: '', redirectTo: 'wizard', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
