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
      if (this.router.getCurrentNavigation().extras.state) {
        this.rulesFile =
          this.router.getCurrentNavigation().extras.state.rulesFile;
        this.textToSearch =
          this.router.getCurrentNavigation().extras.state.textToSearch;
      }
    });
  }

  ionViewDidEnter() {
    if (this.textToSearch) {
      this.scrollTo(this.textToSearch);
    }
  }

  ionViewDidLeave() {
    this.rulesFile = null;
    this.textToSearch = null;
  }

  scrollTo(textToSearch: string) {
    const xpath = `//ion-card-content[text()[contains(., '${textToSearch}')]]`;
    const element: any = document.evaluate(xpath, document.body).iterateNext();
    let offsetY = element.getBoundingClientRect().top;
    let text = element.innerHTML;
    text = text.replace(textToSearch, `<b>${textToSearch}</b>`);
    element.innerHTML = text;

    if (offsetY > 60) {
      offsetY -= 60;
    }

    this.ionContent.scrollToPoint(0, offsetY, 500);
  }

  goBack() {
    this.router.navigate(['tabs/rules']);
  }
}
