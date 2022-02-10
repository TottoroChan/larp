import { DoctorsToolPage } from './components/doctors-tool/doctors-tool.page';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToolsPage } from './tools.page';

import { ToolsPageRoutingModule } from './tools-routing.module';

import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';

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
  ],
  providers: [BarcodeScanner],
})
export class ToolsPageModule {}
