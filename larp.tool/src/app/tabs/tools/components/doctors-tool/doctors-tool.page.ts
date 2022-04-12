import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { FilesService } from 'src/app/shared/services/files.service';
import { Disease, testDisiases } from './models/disease.model';
import { DoctorsTool } from './models/doctors.model';

@Component({
  selector: 'app-doctors-tool',
  templateUrl: 'doctors-tool.page.html',
  styleUrls: ['doctors-tool.page.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DoctorsToolPage {
  scanResult: string;
  realDisiase: Disease;
  isMaster: boolean = false;
  disiaseChecked: boolean = false;
  successResult: boolean = false;
  listOfDiseases: Disease[] = [];

  constructor(
    private barcodeScanner: BarcodeScanner,
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
    // if (this.isMaster) {
    //   this.successResult = true;
    //   this.disiaseChecked = true;
    //   this.realDisiase = testDisiases[0];
    // }

    this.barcodeScanner.scan().then((barcodeData) => {
      this.scanResult = barcodeData.text;
      if (this.isMaster) {
        this.successResult = true;
        this.disiaseChecked = true;
        this.realDisiase = this.getRealDisiase();
      }
    });
  }

  onDisiaseChange(disiaseChecked: boolean){
    this.disiaseChecked = disiaseChecked;
  }

  checkDisiase(disiaseName: string) {
    // this.realDisiase = testDisiases[0];
    // if(this.realDisiase.name == disiaseName){
    //   this.successResult =true
    // }
    // else {
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

  private getRealDisiase() {
    const code = this.scanResult.charAt(32);

    const realDisiase = this.listOfDiseases.find(
      (disiase) => disiase.code == code
    );

    return realDisiase;
  }

  goBack() {
    this.router.navigate(['tabs/tools']);
  }
}
