/* eslint-disable max-len */
export interface MadScienceItem {
  title: string;
  description: string;
}

export interface MadScienceCheck {
  text: string;
  isChecked: boolean;
  isOptional: boolean;
}

export interface MadScience {
  name: string;
  path: string;
  checkList: MadScienceCheck[];
  successRate: MadScienceItem[];
  effects: MadScienceItem[];
}

// eslint-disable-next-line no-var
export const testMadScience: MadScience = {
  name: 'Безумная наука',
  path: './mad-science',
  checkList: [
    {
      text: 'check 1',
      isChecked: false,
      isOptional: false,
    },
    {
      text: 'check 2',
      isChecked: false,
      isOptional: false,
    },
    {
      text: 'check 3',
      isChecked: false,
      isOptional: false,
    },
    {
      text: 'check 4',
      isChecked: false,
      isOptional: true,
    },
  ],
  successRate: [
    {
      title: 'Успех',
      description: 'Механизм работает.',
    },
    {
      title: 'Успех',
      description: 'Механизм работает.',
    },
    {
      title: 'Требует доработки',
      description: 'Механизм в состоянии "Поломка.',
    },
    {
      title: 'Хлам',
      description: 'Механизм не получился.',
    },
  ],
  effects: [
    {
      title: 'Уп-с',
      description:
        'во время эксперимента произошел взрыв. Наносит всем 1 единицу урона в радиусе 2 метров. (на результат изготовления это не влияет).',
    },
    {
      title: 'Ну совсем Безумная наука',
      description: 'Изобретатель получает жетон безумия.',
    },
    {
      title: 'Низкая прочность',
      description: 'Изобретение можно применить только один раз.',
    },
    {
      title: 'Не юзерфрендли',
      description:
        'Вне зависимости от желания создателя, только он может использовать механизм. Если кто-то другой попытается воспользоваться механизмом, механизм получает состояние "Поломка".',
    },
    {
      title: 'Большая красная кнопка',
      description:
        'Вне зависимости от желания создателя, этим механизмом может воспользоваться любой желающий.',
    },
    {
      title: 'Перегрев',
      description:
        'Между применениями механизма должно пройти время. (механизм можно использовать раз в день)',
    },
    {
      title: 'Батарейки в комплект не входят',
      description:
        'Изобретение теперь требует (доп.)ресурс для каждого использования',
    },
    {
      title: 'Ошибка полярности',
      description:
        'действие механизма оказывается обратным желаемому (уточнять действие у ГМ).',
    },
    {
      title: 'Зал славы',
      description:
        'Слава о твоем изобретении быстро передается из уст в уста. Название, функционал и имя конструктора будут разглашены всем игрокам.',
    },
    {
      title: 'Дополнительного эффекта нет',
      description: '',
    },
    {
      title: 'Дополнительного эффекта нет',
      description: '',
    },
    {
      title: 'Надежный',
      description: 'Игрок может вытянуть вторую карту для проверки масти',
    },
    {
      title: 'А это что за деталь?',
      description:
        'после сборки механизма остались часть неиспользованных ресурсов',
    },
  ],
};
