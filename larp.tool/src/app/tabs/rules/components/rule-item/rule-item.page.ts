import { RulesFile } from '@app/tabs/rules/models/rulesFile.model';
import { Component, ViewChild, ViewEncapsulation, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonContent } from '@ionic/angular';

@Component({
  selector: 'app-rule-item',
  templateUrl: 'rule-item.page.html',
  styleUrls: ['rule-item.page.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class RuleItemPageComponent implements OnInit {
  @ViewChild(IonContent) ionContent: IonContent;
  rulesFile: RulesFile;
  textToSearch: string;
  largeFontSize = false;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const data = this.router.getCurrentNavigation().extras.state;

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

  toLargeFontSize() {
    this.largeFontSize = true;
  }

  toSmallFontSize() {
    this.largeFontSize = false;
  }

  goBack() {
    this.router.navigate(['tabs/rules']);
  }
}
