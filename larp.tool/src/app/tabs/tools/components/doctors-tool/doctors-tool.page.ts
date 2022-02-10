import { Component, ViewEncapsulation } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';

@Component({
  selector: 'app-doctors-tool',
  templateUrl: 'doctors-tool.page.html',
  styleUrls: ['doctors-tool.page.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DoctorsToolPage {
  scanResult: string;
  disiaseName: string;
  disiaseChecked: boolean = false;
  successResult: boolean = false;

  constructor(private barcodeScanner: BarcodeScanner, private router: Router) {}

  ionViewDidEnter() {}

  ionViewDidLeave() {}

  scanQR() {
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
    if (this.disiaseName == this.scanResult){
      this.successResult = true;
    }
    else {
      this.successResult = false;
    }
      this.disiaseChecked = true;
  }

  goBack() {
    this.router.navigate(['tabs/tools']);
  }
}
