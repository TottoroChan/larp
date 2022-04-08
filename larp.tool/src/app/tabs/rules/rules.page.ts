import { Component, ViewEncapsulation } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { FilesService } from 'src/app/shared/services/files.service';
import { RulesFile, testRules } from './models/rulesFile.model';

@Component({
  selector: 'app-rules',
  templateUrl: 'rules.page.html',
  styleUrls: ['rules.page.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class RulesPage {
  content: string = '';
  listOfRules: RulesFile[] = [];
  showSearchBar: boolean = false;
  noContent: boolean = false;

  constructor(private router: Router, private filesService: FilesService) {}

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

    let navigationExtras: NavigationExtras = {
      state: {
        rulesFile: rulesFile,
        textToSearch: textToSearch,
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

  private cleanResultList(items: HTMLElement[], index: number) {
    items[index].style.display = 'block';

    if (items[index].querySelector('.result-list')) {
      items[index].querySelector('.result-list').remove();
    }
  }

  private buildResultList(
    rule: RulesFile,
    query: string,
    items: HTMLElement[],
    index: number
  ) {
    let searchResultList = [];

    rule.content.forEach((item) => {
      const content: any = item.content.toLowerCase();

      if (content.indexOf(query) > -1) {
        const regex = new RegExp(
          `(?<=\\s)(.{0,50})(${query})(.{0,50})(?<=\\s?)`,
          'g'
        );
        let match = [...content.matchAll(regex)];

        match.forEach((element) => {
          let foundString = this.trimString(element[0]);

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

  trimString(stringToTrim: any): string {
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
      stringToTrim.indexOf('>') != -1
    ) {
      stringToTrim = stringToTrim.slice(
        stringToTrim.indexOf('>') + 1,
        stringToTrim.length
      );
    }

    return stringToTrim;
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
      let resultlement = document.createElement('p');

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
