import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FilesService } from '@app/shared/services/files.service';
import { CapacitorBarcodeScanner } from '@capacitor/barcode-scanner';
import { Disease, testDisiases } from '@app/tabs/tools/components/doctors-tool/models/disease.model';
import { DoctorsTool } from '@app/tabs/tools/components/doctors-tool/models/doctors.model';

@Component({
  selector: 'app-doctors-tool',
  templateUrl: 'doctors-tool.page.html',
  styleUrls: ['doctors-tool.page.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DoctorsToolPageComponent {
  scanResult: string;
  realDisiase: Disease;
  isMaster = false;
  disiaseChecked = false;
  successResult = false;
  listOfDiseases: Disease[] = [];

  constructor(
    private barcodeScanner: CapacitorBarcodeScanner,
    private router: Router,
    private filesService: FilesService
  ) {}

  ionViewDidEnter() {
    try {
      this.filesService
        .readLocalData<DoctorsTool>('tools', 'doctors.json')
        .then((response) => {
          this.listOfDiseases = response[0].diseases;
        });
      this.filesService.readConfig().then((config) => {
        this.isMaster = config.isMaster;
      });
    } catch (error) {}
  }

  ionViewDidLeave() {
    this.scanResult = null;
    this.realDisiase = null;
    this.disiaseChecked = false;
    this.successResult = false;
    this.isMaster = false;
  }

  scanQR() {
    // this.scanResult = 'A';
    if (this.isMaster) {
      this.successResult = true;
      this.disiaseChecked = true;
      this.realDisiase = testDisiases[0];
    } else {
      CapacitorBarcodeScanner.scanBarcode({
        cameraDirection: 1,
        hint: 17,
      }).then((barcodeData) => {
        this.scanResult = barcodeData.ScanResult;
        if (this.isMaster) {
          this.successResult = true;
          this.disiaseChecked = true;
          this.realDisiase = this.getRealDisiase();
        }
      });
    }
  }

  onDisiaseChange(disiaseChecked: boolean) {
    this.disiaseChecked = disiaseChecked;
  }

  checkDisiase(disiaseName: string) {
    // this.realDisiase = testDisiases[0];
    // if (this.realDisiase.name === disiaseName) {
    //   this.successResult = true;
    // } else {
    //   this.successResult = false;
    // }
    // this.disiaseChecked = true;

    this.realDisiase = this.getRealDisiase();

    if (disiaseName.toLowerCase() == this.realDisiase.name.toLowerCase()) {
      this.successResult = true;
    } else {
      this.successResult = false;
    }

    this.disiaseChecked = true;
  }

  goBack() {
    this.router.navigate(['tabs/tools']);
  }

  private getRealDisiase() {
    const code = this.scanResult.charAt(32);

    const realDisiase = this.listOfDiseases.find(
      (disiase) => disiase.code === code
    );

    return realDisiase;
  }
}
