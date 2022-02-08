import { HttpClient } from '@angular/common/http';
import { Component, ViewEncapsulation } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { AppMode, environment } from 'src/environments/environment';
import { RuleContent, RulesFile } from './models/rulesFile.model';

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

  constructor(private http: HttpClient, private router: Router) {}

  ionViewDidEnter() {
    this.listOfRules = [
      new RulesFile('Magic', [
        new RuleContent(
          '',
          'Магия - основа этого мира, она пронизывает всё живое, а если верить слухам, то она же и является Жизнью.\nВидеть сплетения магических нитей и управлять ими - дар, доступный не каждому. Или ты избран и владеешь им с рождения, или всё отведенное тебе время будет потрачено на попытки уловить отголоски магии и лишь на закате своей жизни ты, возможно, обретешь желаемый дар.'
        ),
        new RuleContent(
          '',
          'Все маги владеют следующими заклинаниями и могут использовать их неограниченное количество раз:\n1. Искра - с кончиков пальцев мага срывается искрящаяся сфера магической энергии, настигающая противника.\nЭффект: при попадании отнимает 1 хит.\nОграничения: маг может иметь с собой и использовать не больше 5-и мячей за один бой. После боя можно подобрать мячи и использовать их снова.\nОтыгрыш: маг произносит заклинание (несколько слов) и кидает мяч, при попадании заклинание срабатывает. Используются цветные заантураженные мягкие мячи диаметром около 5-7см.\n\n2. Удержание жизни - маг произносит заклинание над умирающим, не позволяя жизненным силам покинуть тело.\nЭффект: стабилизирует раненого.\nОграничения: маг не может стабилизировать легкие ранения.\nОтыгрыш: маг произносит заклинание (30-40 слов) и прикасается к умирающему.\n\n3. Лечение - слова заклинания и сила, исходящая от мага, сплетаются в единый поток жизненной энергии, немного залечивая смертельные раны.\nЭффект: восстанавливает 1 хит.\nОграничения: заклинание используется только для того, чтобы вывести из состояния тяжелого ранения (не восстанавливает хиты тем, кто имеет 1 и более хитов). Не может использоваться во время боевой ситуации.\nОтыгрыш: над тяжелораненым маг читает заклинание и проводит ритуал в течение 5 минут.\n\n4. Идентификация - распутывая узлы магических нитей, пронизывающих незнакомый предмет, маг распознает смутные образы, позволяющие узнать больше, чем может увидеть обычный человек.\nЭффект: маг получает расширенную информацию о предмете.\nОграничения: на каждый предмет маг может использовать заклинание только один раз.\nОтыгрыш: проводится небольшой ритуал над предметом, после чего маг получает у мастера головоломку, разгадав которую узнает дополнительную информацию о предмете.'
        ),
        new RuleContent(
          '',
          'Каждый маг сам придумывает отыгрыш заклинаний в рамках их описания, заранее согласуя детали с мастером (текст заклинаний, отыгрыш, используемый реквизит). Текст заклинаний обязательно оформляется в магические книги или свитки (в которых ещё и можно разместить правила по магии).\nТекст заклинания должен быть написан на русском языке и иметь содержание, позволяющее понять эффект.'
        ),
      ]),
      new RulesFile('Madness', [
        new RuleContent(
          'ОСНОВНЫЕ ПОЛОЖЕНИЯ',
          '- Любой игрок за определенные действия или бездействие может получить жетон безумия.\n- Наличие каждого жетона безумия сопровождается отыгрышем эффекта, который указан в аусвайсе.\n- В аусвайсе имеются три пронумерованные закрытые графы, описывающие магия эффекты безумия. При получении жетона необходимо открыть эффект и отыгрывать его (все открытые эффекты действуют одновременно). При снятии жетона безумия последний открытый эффект перестает действовать, а графа закрывается.\n- Игрок может иметь не более трех жетонов безумия. Получение четвертого влечет за собой смерть персонажа. Получить 4-й жетон от другого игрока нельзя, но можно приобрести его входе иных игровых взаимодействий (см. раздел Получение безумия)\n- Жетоны безумия неизымаемы, а также их нельзя передавать от игрока к игроку без наличия соответствующей способности (см. ниже).'
        ),
        new RuleContent(
          'ОТЫГРЫШ БЕЗУМИЯ',
          '- Отыгрывание эффектов безумия целиком и полностью на совести игрока и не будет отслеживаться мастерами.\n- Игрок волен интерпретировать эффект безумия так и в такой степени, как посчитает приемлемым для себя и персонажа\n- При отыгрывании безумия не стоит ударяться в крайности, дабы не превращать происходящее в цирк.\n- Если какой-либо эффект, его формулировка или отыгрыш вызывает непонимание или сомнение, то за разъяснением желательно обратиться к мастеру.\n- Мастерская группа настоятельно рекомендует не пренебрегать отыгрышем эффектов безумия для сохранения атмосферы игры.'
        ),
      ]),
    ];
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
        textToSearch: event.target.parentElement.classList.contains("result-list") ?  event.target.textContent : null,
      },
    };
    this.router.navigate(['tabs/rules/item'], navigationExtras);
  }

  toggleSearch() {
    this.showSearchBar = !this.showSearchBar;
  }

  search(event) {
    const items = Array.from(
      document.querySelector('ion-list')
        .children as HTMLCollectionOf<HTMLElement>
    );
    const query = event.target.value.toLowerCase();
    requestAnimationFrame(() => {
      this.listOfRules.forEach((rule, index) => {
        this.cleanResultList(items, index);

        this.buildResultList(rule, query, items, index);

        this.renderResultList(query, items, index);
      });
    });
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
    if (query.length > 2) {
      const resultListElement = document.createElement('div');
      resultListElement.className = 'result-list';
      items[index].querySelector('ion-label').appendChild(resultListElement);

      this.searchResultList.forEach((result) => {
        let resultlement = document.createElement('p');
        resultlement.innerHTML = result.replace(query, `<b>${query}</b>`);
        items[index].querySelector('.result-list').appendChild(resultlement);
      });
    }
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
