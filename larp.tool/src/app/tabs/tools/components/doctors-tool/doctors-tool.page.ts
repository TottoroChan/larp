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
  disiaseName: string;
  realDisiase: Disease;
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
    } catch (error) {}
  }

  ionViewDidLeave() {
    this.scanResult = null;
    this.disiaseName = null;
    this.realDisiase = null;
    this.disiaseChecked = false;
    this.successResult = false;
  }

  disiaseChange() {
    this.disiaseChecked = false;
  }

  scanQR() {
    //this.scanResult = "B";
    this.barcodeScanner.scan().then((barcodeData) => {
      this.scanResult = barcodeData.text;
    });
  }

  checkDisiase() {
    // this.successResult = true;
    // this.disiaseChecked = true;
    const code = this.scanResult.charAt(32);

    this.realDisiase = this.listOfDiseases.find(
      (disiase) => disiase.code == code
    );

    if (this.disiaseName.toLowerCase() == this.realDisiase.name.toLowerCase()) {
      this.successResult = true;
    } else {
      this.successResult = false;
    }

    this.disiaseChecked = true;
  }

  goBack() {
    this.router.navigate(['tabs/tools']);
  }

  flipCard(event) {
    var element = event.currentTarget;

    if (element.className === 'card') {
      if (element.style.transform == 'rotateY(180deg)') {
        element.style.transform = 'rotateY(0deg)';
      } else {
        element.style.transform = 'rotateY(180deg)';
      }
    }
  }
}
