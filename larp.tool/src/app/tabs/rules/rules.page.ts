import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { FilesService } from '@app/shared/services/files.service';
import { RulesFile, testRules } from '@app/tabs/rules/models/rulesFile.model';

@Component({
  selector: 'app-rules',
  templateUrl: 'rules.page.html',
  styleUrls: ['rules.page.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class RulesPage implements OnInit {
  content = '';
  listOfRules: RulesFile[] = [];
  showSearchBar = false;
  noContent = false;

  constructor(private router: Router, private filesService: FilesService) {}

  ngOnInit(): void {}

  ionViewDidEnter() {
    try {
      this.filesService.readLocalData<RulesFile>('rules').then((response) => {
        if (response) {
          this.noContent = false;

          this.listOfRules = response;
        } else {
          this.noContent = true;
        }
      });
    } catch (error) {}
  }

  ionViewDidLeave() {
    this.listOfRules = [];
    this.showSearchBar = false;
    this.noContent = false;
  }

  showItem(rulesFile: RulesFile, event) {
    const resultEvent =
      event.target.parentElement.classList.contains('result-list');
    const textToSearch = resultEvent ? event.target.textContent : null;

    const navigationExtras: NavigationExtras = {
      state: {
        rulesFile,
        textToSearch,
      },
    };

    this.router.navigate(['tabs/rules/item'], navigationExtras);
  }

  toggleSearch() {
    this.showSearchBar = !this.showSearchBar;
  }

  search(event) {
    const query = event.target.value.toLowerCase();
    const allChildren = Array.from(
      document.querySelector('ion-list')
        .children as HTMLCollectionOf<HTMLElement>
    );
    const items = allChildren.filter(
      (item) => !item.classList.contains('rules-item-divider')
    );

    if (query.length > 2) {
      requestAnimationFrame(() => {
        this.listOfRules.forEach((rule, index) => {
          this.cleanResultList(items, index);

          const searchResultList = this.buildResultList(
            rule,
            query,
            items,
            index
          );

          this.renderResultList(query, items, index, searchResultList);
        });
      });
    } else {
      this.listOfRules.forEach((rule, index) => {
        this.cleanResultList(items, index);
      });
    }
  }

  trimString(stringToTrim: any): string {
    stringToTrim = stringToTrim.trim();

    const isCleanString = !['<', '>'].some((x) => stringToTrim.includes(x));
    if (isCleanString) {
      return stringToTrim;
    }

    console.log(stringToTrim);

    while (stringToTrim.indexOf('<') > stringToTrim.length / 2) {
      stringToTrim = stringToTrim.slice(0, stringToTrim.lastIndexOf('<'));
    }

    while (
      stringToTrim.indexOf('>') < stringToTrim.length / 2 &&
      stringToTrim.indexOf('>') !== -1
    ) {
      stringToTrim = stringToTrim.slice(
        stringToTrim.indexOf('>') + 1,
        stringToTrim.length
      );
    }

    stringToTrim = stringToTrim.trim();

    return stringToTrim;
  }

  goHome() {
    this.router.navigateByUrl(`tabs/home`);
  }

  private buildResultList(
    rule: RulesFile,
    query: string,
    items: HTMLElement[],
    index: number
  ) {
    const searchResultList = [];

    rule.content.forEach((item) => {
      const content: any = item.content.toLowerCase();

      if (content.indexOf(query) > -1) {
        const regex = new RegExp(`(\\s)(.{0,50})(${query})(.{0,50})(\\s)`, 'g');
        const match = [...content.matchAll(regex)];

        match.forEach((element) => {
          const foundString = this.trimString(element[0]);

          const searchResult = item.content.substring(
            content.indexOf(foundString),
            content.indexOf(foundString) + foundString.length
          );

          searchResultList.push(searchResult);
        });
      }
    });

    items[index].style.display = searchResultList.length ? 'block' : 'none';

    return searchResultList;
  }

  private cleanResultList(items: HTMLElement[], index: number) {
    items[index].style.display = 'block';

    if (items[index].querySelector('.result-list')) {
      items[index].querySelector('.result-list').remove();
    }
  }

  private renderResultList(
    query: string,
    items: HTMLElement[],
    index: number,
    searchResultList
  ) {
    const resultListElement = document.createElement('div');
    resultListElement.className = 'result-list';
    items[index].querySelector('ion-label').appendChild(resultListElement);

    searchResultList.forEach((result) => {
      const resultlement = document.createElement('p');

      const searchQuery = result.substring(
        result.toLowerCase().indexOf(query),
        result.toLowerCase().indexOf(query) + query.length
      );

      resultlement.innerHTML = result.replace(
        searchQuery,
        `<b>${searchQuery}</b>`
      );

      items[index].querySelector('.result-list').appendChild(resultlement);
    });
  }
}
