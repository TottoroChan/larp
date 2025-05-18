import { ThiefToolPage } from './components/thief-tool/thief-tool.page';
import { MasterResultComponent } from './components/doctors-tool/components/master-result/master-result.component';
import { SuccessResultComponent } from './components/doctors-tool/components/success-result/success-result.component';
import { ScanResultComponent } from './components/doctors-tool/components/scan-result/scan-result.component';
import { FilesService } from 'src/app/shared/services/files.service';
import { DoctorsToolPage } from './components/doctors-tool/doctors-tool.page';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToolsPage } from './tools.page';

import { ToolsPageRoutingModule } from './tools-routing.module';

import { MadScienceToolPage } from './components/mad-science-tool/mad-science-tool.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: ToolsPage }]),
    ToolsPageRoutingModule,
  ],
  declarations: [
    ToolsPage,
    DoctorsToolPage,
    ScanResultComponent,
    SuccessResultComponent,
    MasterResultComponent,
    MadScienceToolPage,
    ThiefToolPage
  ],
  providers: [FilesService],
})
export class ToolsPageModule {}
