import { Component, ViewEncapsulation } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { AppMode, environment } from 'src/environments/environment';
import { RulesFile, testRules } from './models/rulesFile.model';

@Component({
  selector: 'app-rules',
  templateUrl: 'rules.page.html',
  styleUrls: ['rules.page.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class RulesPage {
  listOfRules: RulesFile[] = [];
  showSearchBar: boolean = false;
  searchResultList: any = [];

  constructor(private router: Router) {}

  ionViewDidEnter() {
    this.listOfRules = testRules;
  }

  ionViewDidLeave() {
    this.listOfRules = [];
    this.showSearchBar = false;
    this.searchResultList = [];
  }

  showItem(rulesFile: RulesFile, event) {
    let navigationExtras: NavigationExtras = {
      state: {
        rulesFile: rulesFile,
        textToSearch: event.target.parentElement.classList.contains(
          'result-list'
        )
          ? event.target.textContent
          : null,
      },
    };
    this.router.navigate(['tabs/rules/item'], navigationExtras);
  }

  toggleSearch() {
    this.showSearchBar = !this.showSearchBar;
  }

  search(event) {
    const query = event.target.value.toLowerCase();
    const items = Array.from(
      document.querySelector('ion-list')
        .children as HTMLCollectionOf<HTMLElement>
    );

    if (query.length > 2) {
      requestAnimationFrame(() => {
        this.listOfRules.forEach((rule, index) => {
          this.cleanResultList(items, index);

          this.buildResultList(rule, query, items, index);

          this.renderResultList(query, items, index);
        });
      });
    } else {
      this.listOfRules.forEach((rule, index) => {
        this.cleanResultList(items, index);
      });
      this.searchResultList = [];
    }
  }

  private cleanResultList(items: HTMLElement[], index: number) {
    if (items[index].querySelector('.result-list')) {
      items[index].querySelector('.result-list').remove();
    }
  }

  private buildResultList(
    rule: RulesFile,
    query: any,
    items: HTMLElement[],
    index: number
  ) {
    this.searchResultList = [];
    rule.content.forEach((item) => {
      if (item.content.toLowerCase().indexOf(query) > -1) {
        let match = item.content.match(`(.{0,50})(${query})(.{0,50})`)[0];
        this.searchResultList.push(match);
      }
    });

    items[index].style.display = this.searchResultList.length
      ? 'block'
      : 'none';

    return this.searchResultList;
  }

  private renderResultList(query: any, items: HTMLElement[], index: number) {
    const resultListElement = document.createElement('div');
    resultListElement.className = 'result-list';
    items[index].querySelector('ion-label').appendChild(resultListElement);

    this.searchResultList.forEach((result) => {
      let resultlement = document.createElement('p');
      resultlement.innerHTML = result.replace(query, `<b>${query}</b>`);
      items[index].querySelector('.result-list').appendChild(resultlement);
    });
  }

  private getRulesPath(): string {
    let path = null;
    switch (environment.appMode) {
      case AppMode.master:
        path = '/assets/content/master';
      case AppMode.player:
        path = '/assets/content/player';
    }

    return path;
  }
}
