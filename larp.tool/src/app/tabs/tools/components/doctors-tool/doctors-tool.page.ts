import { Component, ViewEncapsulation } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { Disease, testDisiases } from './models/disease.model';

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

  constructor(private barcodeScanner: BarcodeScanner, private router: Router) {}

  ionViewDidEnter() {}

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
    //this.scanResult = "A";
    this.barcodeScanner
      .scan()
      .then((barcodeData) => {
        console.log('Barcode data', barcodeData);
        this.scanResult = barcodeData.text;
      })
      .catch((err) => {
        console.log('Error', err);
      });
  }

  checkDisiase() {
    const code = this.scanResult.charAt(32);
    this.realDisiase = testDisiases.find((disiase) => disiase.code == code);

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
}
