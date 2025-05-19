import { ThiefToolPageComponent } from '@app/tabs/tools/components/thief-tool/thief-tool.page';
import { MasterResultComponent } from '@app/tabs/tools/components/doctors-tool/components/master-result/master-result.component';
import { SuccessResultComponent } from '@app/tabs/tools/components/doctors-tool/components/success-result/success-result.component';
import { ScanResultComponent } from '@app/tabs/tools/components/doctors-tool/components/scan-result/scan-result.component';
import { FilesService } from '@app/shared/services/files.service';
import { DoctorsToolPageComponent } from '@app/tabs/tools/components/doctors-tool/doctors-tool.page';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToolsPageComponent } from '@app/tabs/tools/tools.page';

import { ToolsPageRoutingModule } from '@app/tabs/tools/tools-routing.module';

import { MadScienceToolPageComponent } from '@app/tabs/tools/components/mad-science-tool/mad-science-tool.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: ToolsPageComponent }]),
    ToolsPageRoutingModule,
  ],
  declarations: [
    ToolsPageComponent,
    DoctorsToolPageComponent,
    ScanResultComponent,
    SuccessResultComponent,
    MasterResultComponent,
    MadScienceToolPageComponent,
    ThiefToolPageComponent
  ],
  providers: [FilesService],
})
export class ToolsPageModule {}
