export interface CombinationItem {
  type: string;
  addons: AddonItem[];
}

interface AddonItem {
  type: string;
  isCraftOnly: boolean;
  power: number[];
}

// export const typeList = [
//   'Антибиотик (АБ)',
//   'Антисептик (АС)',
//   'Обезболивающее (ОБ)',
//   'Имунник (ИМ)',
// ];

// export const compoundList = [
//   'Кровь (КР)',
//   'Мозг (МЗ)',
//   'Сердце (СР)',
//   'Печень (ПЧ)',
//   'Бурая твирь (БТ)',
//   'Черная твирь (ЧТ)',
//   'Кровавая твирь (КТ)',
//   'Савьюр (СА)',
//   'Сечь (СЕ)',
//   'Белая плеть (БП)',
// ];
