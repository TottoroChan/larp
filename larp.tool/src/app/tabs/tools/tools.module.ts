import { FilesService } from 'src/app/shared/services/files.service';
import { DoctorsToolPage } from './components/doctors-tool/doctors-tool.page';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToolsPage } from './tools.page';

import { ToolsPageRoutingModule } from './tools-routing.module';

import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
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
    MadScienceToolPage
  ],
  providers: [BarcodeScanner, FilesService],
})
export class ToolsPageModule {}
