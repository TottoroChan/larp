import { RulesFile } from './../../models/rulesFile.model';
import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonContent } from '@ionic/angular';

@Component({
  selector: 'app-rule-item',
  templateUrl: 'rule-item.page.html',
  styleUrls: ['rule-item.page.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class RuleItemPage {
  @ViewChild(IonContent) ionContent: IonContent;
  rulesFile: RulesFile;
  textToSearch: string;

  constructor(private route: ActivatedRoute, private router: Router) {
    this.route.queryParams.subscribe((params) => {
      var data = this.router.getCurrentNavigation().extras.state;

      if (data) {
        this.rulesFile = data.rulesFile;
        this.textToSearch = data.textToSearch;
      }
    });
  }

  ionViewDidEnter() {
    if (this.textToSearch) {
      this.scrollTo();
    }
  }

  ionViewDidLeave() {
    this.rulesFile = null;
    this.textToSearch = null;
  }

  scrollTo() {
    const element = document.querySelector('.highlight');

    let offsetY = element.getBoundingClientRect().top;

    if (offsetY > 150) {
      offsetY -= 150;

      this.ionContent.scrollToPoint(0, offsetY, 500);
    }
  }

  goBack() {
    this.router.navigate(['tabs/rules']);
  }
}
