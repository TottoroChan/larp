import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-doctors-tool',
  templateUrl: 'doctors-tool.page.html',
  styleUrls: ['doctors-tool.page.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DoctorsToolPage {

  constructor(private route: ActivatedRoute, private router: Router) {
  }

  ionViewDidEnter() {
  }

  ionViewDidLeave() {
  }

  goBack(){
    this.router.navigate(['tabs/tools']);
  }
}
