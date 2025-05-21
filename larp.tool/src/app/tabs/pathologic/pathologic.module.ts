import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HomePageRoutingModule } from '@app/tabs/pathologic/pathologic-routing.module';
import { PathologicPageComponent } from '@app/tabs/pathologic/pathologic.page';
import { MaskitoDirective } from '@maskito/angular';
import { SymptomsTableComponent } from '@app/tabs/pathologic/components/symptoms-table/symptoms-table.component';
import { MedicineComponent } from '@app/tabs/pathologic/components/medicine/medicine.component';
import { PreviewComponent } from '@app/tabs/pathologic/components/preview/preview.component';
import { ResultComponent } from '@app/tabs/pathologic/components/result/result.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HomePageRoutingModule,
    MaskitoDirective,
  ],
  declarations: [
    PathologicPageComponent,
    SymptomsTableComponent,
    MedicineComponent,
    PreviewComponent,
    ResultComponent
  ],
  providers: [],
})
export class PathologicPageModule {}
