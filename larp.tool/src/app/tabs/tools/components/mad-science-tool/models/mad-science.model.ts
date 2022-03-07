export class MadScienceItem {
  title: string;
  description: string;

  constructor(title: string, description: string) {
    this.title = title;
    this.description = description;
  }
}

export class MadScienceCheck {
  text: string;
  isChecked: boolean;
  isOptional: boolean;

  constructor(text: string, isChecked: boolean, isOptional: boolean) {
    this.text = text;
    this.isChecked = isChecked;
    this.isOptional = isOptional;
  }
}

export class MadScience {
  name: string;
  path: string;
  checkList: MadScienceCheck[];
  successRate: MadScienceItem[];
  effects: MadScienceItem[];

  constructor(
    name: string,
    path: string,
    checkList: MadScienceCheck[],
    successRate: MadScienceItem[],
    effects: MadScienceItem[]
  ) {
    this.name = name;
    this.path = path;
    this.checkList = checkList;
    this.successRate = successRate;
    this.effects = effects;
  }
}

export var testMadScience = new MadScience(
  'Безумная наука',
  './mad-science',
  [
    new MadScienceCheck('chek 1', false, false),
    new MadScienceCheck('chek 2', false, false),
    new MadScienceCheck('chek 3', false, false),
    new MadScienceCheck('chek 4', false, true),
  ],
  [
    new MadScienceItem('Успех', 'Механизм работает.'),
    new MadScienceItem('Успех', 'Механизм работает.'),
    new MadScienceItem('Требует доработки', 'Механизм в состоянии "Поломка.'),
    new MadScienceItem('Хлам', 'Механизм не получился.'),
  ],
  [
    new MadScienceItem(
      'Уп-с',
      'во время эксперимента произошел взрыв. Наносит всем 1 единицу урона в радиусе 2 метров. (на результат изготовления это не влияет).'
    ),
    new MadScienceItem(
      'Ну совсем Безумная наука',
      'Изобретатель получает жетон безумия.'
    ),
    new MadScienceItem(
      'Низкая прочность',
      'Изобретение можно применить только один раз.'
    ),
    new MadScienceItem(
      'Не юзерфрендли',
      'Вне зависимости от желания создателя, только он может использовать механизм. Если кто-то другой попытается воспользоваться механизмом, механизм получает состояние "Поломка".'
    ),
    new MadScienceItem(
      'Большая красная кнопка',
      'Вне зависимости от желания создателя, этим механизмом может воспользоваться любой желающий.'
    ),
    new MadScienceItem(
      'Перегрев',
      ' Между применениями механизма должно пройти время. (механизм можно использовать раз в день)'
    ),
    new MadScienceItem(
      'Батарейки в комплект не входят',
      'Изобретение теперь требует (доп.)ресурс для каждого использования'
    ),
    new MadScienceItem(
      'Ошибка полярности',
      'действие механизма оказывается обратным желаемому (уточнять действие у ГМ).'
    ),
    new MadScienceItem(
      'Зал славы',
      'Слава о твоем изобретении быстро передается из уст в уста. Название, функционал и имя конструктора будут разглашены всем игрокам.'
    ),
    new MadScienceItem('Дополнительного эффекта нет', ''),
    new MadScienceItem('Дополнительного эффекта нет', ''),
    new MadScienceItem(
      'Надежный',
      'Игрок может вытянуть вторую карту для проверки масти.'
    ),
    new MadScienceItem(
      'А это что за деталь?',
      'после сборки механизма остались часть неиспользованных ресурсов.'
    ),
  ]
);
