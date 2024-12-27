export interface MedicItem {
  type: string;
  location: string;
  compound: string;
}

export interface CombinationItem {
  layer: number;
  type: string;
  addons: AddonItem[];
}
export interface AddonItem {
  type: string;
  isCraftOnly: boolean;
  value: number;
}

export const typeList = [
  'Антибиотик (АБ)',
  'Антисептик (АС)',
  'Обезболивающее (ОБ)',
  'Имунник (ИМ)',
];

export const compoundList = [
  'Кровь (КР)',
  'Мозг (МЗ)',
  'Сердце (СР)',
  'Печень (ПЧ)',
  'Бурая твирь (БТ)',
  'Черная твирь (ЧТ)',
  'Кровавая твирь (КТ)',
  'Савьюр (СА)',
  'Сечь (СЕ)',
  'Белая плеть (БП)',
];

export const immuneCombinations: CombinationItem[] = [
  {
    layer: 1,
    type: 'Бурая твирь (БТ)',
    addons: [{ type: 'Бурая твирь (БТ)', isCraftOnly: false, value: 2 }],
  },
  {
    layer: 1,
    type: 'Черная твирь (ЧТ)',
    addons: [
      { type: 'Бурая твирь (БТ)', isCraftOnly: false, value: 2 },
      { type: 'Черная твирь (ЧТ)', isCraftOnly: false, value: 2 },
    ],
  },
  {
    layer: 1,
    type: 'Кровавая твирь (КТ)',
    addons: [
      { type: 'Бурая твирь (БТ)', isCraftOnly: false, value: 1 },
      { type: 'Черная твирь (ЧТ)', isCraftOnly: false, value: 1 },
      { type: 'Кровавая твирь (КТ)', isCraftOnly: false, value: 0 },
    ],
  },
  {
    layer: 1,
    type: 'Савьюр (СА)',
    addons: [
      { type: 'Бурая твирь (БТ)', isCraftOnly: true, value: 3 },
      { type: 'Черная твирь (ЧТ)', isCraftOnly: true, value: 3 },
      { type: 'Кровавая твирь (КТ)', isCraftOnly: false, value: 2 },
      { type: 'Савьюр (СА)', isCraftOnly: true, value: 4 },
    ],
  },
  {
    layer: 1,
    type: 'Сечь (СЕ)',
    addons: [
      { type: 'Бурая твирь (БТ)', isCraftOnly: true, value: 1 },
      { type: 'Черная твирь (ЧТ)', isCraftOnly: false, value: 1 },
      { type: 'Кровавая твирь (КТ)', isCraftOnly: true, value: 0 },
      { type: 'Савьюр (СА)', isCraftOnly: false, value: 2 },
      { type: 'Сечь (СЕ)', isCraftOnly: true, value: 0 },
    ],
  },
  {
    layer: 1,
    type: 'Белая плеть (БП)',
    addons: [
      { type: 'Бурая твирь (БТ)', isCraftOnly: false, value: 1 },
      { type: 'Черная твирь (ЧТ)', isCraftOnly: true, value: 1 },
      { type: 'Кровавая твирь (КТ)', isCraftOnly: true, value: 0 },
      { type: 'Савьюр (СА)', isCraftOnly: false, value: 2 },
      { type: 'Сечь (СЕ)', isCraftOnly: false, value: 0 },
      { type: 'Белая плеть (БП)', isCraftOnly: true, value: 0 },
    ],
  },
  {
    layer: 2,
    type: 'Бурая твирь (БТ)',
    addons: [{ type: 'Бурая твирь (БТ)', isCraftOnly: false, value: 2 }],
  },
  {
    layer: 2,
    type: 'Черная твирь (ЧТ)',
    addons: [
      { type: 'Бурая твирь (БТ)', isCraftOnly: false, value: 1 },
      { type: 'Черная твирь (ЧТ)', isCraftOnly: false, value: 0 },
    ],
  },
  {
    layer: 2,
    type: 'Кровавая твирь (КТ)',
    addons: [
      { type: 'Бурая твирь (БТ)', isCraftOnly: false, value: 2 },
      { type: 'Черная твирь (ЧТ)', isCraftOnly: false, value: 1 },
      { type: 'Кровавая твирь (КТ)', isCraftOnly: false, value: 2 },
    ],
  },
  {
    layer: 2,
    type: 'Савьюр (СА)',
    addons: [
      { type: 'Бурая твирь (БТ)', isCraftOnly: true, value: 1 },
      { type: 'Черная твирь (ЧТ)', isCraftOnly: true, value: 0 },
      { type: 'Кровавая твирь (КТ)', isCraftOnly: false, value: 1 },
      { type: 'Савьюр (СА)', isCraftOnly: true, value: 0 },
    ],
  },
  {
    layer: 2,
    type: 'Сечь (СЕ)',
    addons: [
      { type: 'Бурая твирь (БТ)', isCraftOnly: true, value: 3 },
      { type: 'Черная твирь (ЧТ)', isCraftOnly: false, value: 2 },
      { type: 'Кровавая твирь (КТ)', isCraftOnly: true, value: 3 },
      { type: 'Савьюр (СА)', isCraftOnly: false, value: 2 },
      { type: 'Сечь (СЕ)', isCraftOnly: true, value: 4 },
    ],
  },
  {
    layer: 2,
    type: 'Белая плеть (БП)',
    addons: [
      { type: 'Бурая твирь (БТ)', isCraftOnly: false, value: 1 },
      { type: 'Черная твирь (ЧТ)', isCraftOnly: true, value: 0 },
      { type: 'Кровавая твирь (КТ)', isCraftOnly: true, value: 1 },
      { type: 'Савьюр (СА)', isCraftOnly: false, value: 0 },
      { type: 'Сечь (СЕ)', isCraftOnly: false, value: 2 },
      { type: 'Белая плеть (БП)', isCraftOnly: true, value: 0 },
    ],
  },
  {
    layer: 3,
    type: 'Бурая твирь (БТ)',
    addons: [{ type: 'Бурая твирь (БТ)', isCraftOnly: false, value: 0 }],
  },
  {
    layer: 3,
    type: 'Черная твирь (ЧТ)',
    addons: [
      { type: 'Бурая твирь (БТ)', isCraftOnly: false, value: 1 },
      { type: 'Черная твирь (ЧТ)', isCraftOnly: false, value: 2 },
    ],
  },
  {
    layer: 3,
    type: 'Кровавая твирь (КТ)',
    addons: [
      { type: 'Бурая твирь (БТ)', isCraftOnly: false, value: 1 },
      { type: 'Черная твирь (ЧТ)', isCraftOnly: false, value: 2 },
      { type: 'Кровавая твирь (КТ)', isCraftOnly: false, value: 2 },
    ],
  },
  {
    layer: 3,
    type: 'Савьюр (СА)',
    addons: [
      { type: 'Бурая твирь (БТ)', isCraftOnly: true, value: 0 },
      { type: 'Черная твирь (ЧТ)', isCraftOnly: true, value: 1 },
      { type: 'Кровавая твирь (КТ)', isCraftOnly: false, value: 1 },
      { type: 'Савьюр (СА)', isCraftOnly: true, value: 0 },
    ],
  },
  {
    layer: 3,
    type: 'Сечь (СЕ)',
    addons: [
      { type: 'Бурая твирь (БТ)', isCraftOnly: true, value: 0 },
      { type: 'Черная твирь (ЧТ)', isCraftOnly: false, value: 1 },
      { type: 'Кровавая твирь (КТ)', isCraftOnly: true, value: 1 },
      { type: 'Савьюр (СА)', isCraftOnly: false, value: 0 },
      { type: 'Сечь (СЕ)', isCraftOnly: true, value: 0 },
    ],
  },
  {
    layer: 3,
    type: 'Белая плеть (БП)',
    addons: [
      { type: 'Бурая твирь (БТ)', isCraftOnly: false, value: 2 },
      { type: 'Черная твирь (ЧТ)', isCraftOnly: true, value: 3 },
      { type: 'Кровавая твирь (КТ)', isCraftOnly: true, value: 3 },
      { type: 'Савьюр (СА)', isCraftOnly: false, value: 2 },
      { type: 'Сечь (СЕ)', isCraftOnly: false, value: 2 },
      { type: 'Белая плеть (БП)', isCraftOnly: true, value: 4 },
    ],
  },
];

export const antibioticCombinations: CombinationItem[] = [
  {
    layer: 1,
    type: 'Мозг (МЗ)',
    addons: [
      { type: 'Бурая твирь (БТ)', isCraftOnly: false, value: 2 },
      { type: 'Черная твирь (ЧТ)', isCraftOnly: false, value: 2 },
      { type: 'Кровавая твирь (КТ)', isCraftOnly: false, value: 1 },
      { type: 'Савьюр (СА)', isCraftOnly: true, value: 3 },
      { type: 'Сечь (СЕ)', isCraftOnly: false, value: 1 },
      { type: 'Белая плеть (БП)', isCraftOnly: false, value: 1 },
    ],
  },
  {
    layer: 1,
    type: 'Сердце (СР)',
    addons: [
      { type: 'Бурая твирь (БТ)', isCraftOnly: false, value: 1 },
      { type: 'Черная твирь (ЧТ)', isCraftOnly: false, value: 1 },
      { type: 'Кровавая твирь (КТ)', isCraftOnly: false, value: 0 },
      { type: 'Савьюр (СА)', isCraftOnly: false, value: 2 },
      { type: 'Сечь (СЕ)', isCraftOnly: true, value: 0 },
      { type: 'Белая плеть (БП)', isCraftOnly: false, value: 0 },
    ],
  },
  {
    layer: 1,
    type: 'Печень (ПЧ)',
    addons: [
      { type: 'Бурая твирь (БТ)', isCraftOnly: false, value: 1 },
      { type: 'Черная твирь (ЧТ)', isCraftOnly: false, value: 1 },
      { type: 'Кровавая твирь (КТ)', isCraftOnly: false, value: 0 },
      { type: 'Савьюр (СА)', isCraftOnly: false, value: 2 },
      { type: 'Сечь (СЕ)', isCraftOnly: false, value: 0 },
      { type: 'Белая плеть (БП)', isCraftOnly: true, value: 0 },
    ],
  },
  {
    layer: 2,
    type: 'Мозг (МЗ)',
    addons: [
      { type: 'Бурая твирь (БТ)', isCraftOnly: false, value: 1 },
      { type: 'Черная твирь (ЧТ)', isCraftOnly: false, value: 0 },
      { type: 'Кровавая твирь (КТ)', isCraftOnly: false, value: 1 },
      { type: 'Савьюр (СА)', isCraftOnly: true, value: 0 },
      { type: 'Сечь (СЕ)', isCraftOnly: false, value: 2 },
      { type: 'Белая плеть (БП)', isCraftOnly: false, value: 0 },
    ],
  },
  {
    layer: 2,
    type: 'Сердце (СР)',
    addons: [
      { type: 'Бурая твирь (БТ)', isCraftOnly: false, value: 2 },
      { type: 'Черная твирь (ЧТ)', isCraftOnly: false, value: 1 },
      { type: 'Кровавая твирь (КТ)', isCraftOnly: false, value: 2 },
      { type: 'Савьюр (СА)', isCraftOnly: false, value: 1 },
      { type: 'Сечь (СЕ)', isCraftOnly: true, value: 3 },
      { type: 'Белая плеть (БП)', isCraftOnly: false, value: 1 },
    ],
  },
  {
    layer: 2,
    type: 'Печень (ПЧ)',
    addons: [
      { type: 'Бурая твирь (БТ)', isCraftOnly: false, value: 1 },
      { type: 'Черная твирь (ЧТ)', isCraftOnly: false, value: 0 },
      { type: 'Кровавая твирь (КТ)', isCraftOnly: false, value: 1 },
      { type: 'Савьюр (СА)', isCraftOnly: false, value: 0 },
      { type: 'Сечь (СЕ)', isCraftOnly: false, value: 2 },
      { type: 'Белая плеть (БП)', isCraftOnly: true, value: 0 },
    ],
  },
  {
    layer: 3,
    type: 'Мозг (МЗ)',
    addons: [
      { type: 'Бурая твирь (БТ)', isCraftOnly: false, value: 0 },
      { type: 'Черная твирь (ЧТ)', isCraftOnly: false, value: 1 },
      { type: 'Кровавая твирь (КТ)', isCraftOnly: false, value: 1 },
      { type: 'Савьюр (СА)', isCraftOnly: true, value: 0 },
      { type: 'Сечь (СЕ)', isCraftOnly: false, value: 0 },
      { type: 'Белая плеть (БП)', isCraftOnly: false, value: 2 },
    ],
  },
  {
    layer: 3,
    type: 'Сердце (СР)',
    addons: [
      { type: 'Бурая твирь (БТ)', isCraftOnly: false, value: 0 },
      { type: 'Черная твирь (ЧТ)', isCraftOnly: false, value: 1 },
      { type: 'Кровавая твирь (КТ)', isCraftOnly: false, value: 1 },
      { type: 'Савьюр (СА)', isCraftOnly: false, value: 0 },
      { type: 'Сечь (СЕ)', isCraftOnly: true, value: 0 },
      { type: 'Белая плеть (БП)', isCraftOnly: false, value: 2 },
    ],
  },
  {
    layer: 3,
    type: 'Печень (ПЧ)',
    addons: [
      { type: 'Бурая твирь (БТ)', isCraftOnly: false, value: 1 },
      { type: 'Черная твирь (ЧТ)', isCraftOnly: false, value: 2 },
      { type: 'Кровавая твирь (КТ)', isCraftOnly: false, value: 2 },
      { type: 'Савьюр (СА)', isCraftOnly: false, value: 1 },
      { type: 'Сечь (СЕ)', isCraftOnly: false, value: 1 },
      { type: 'Белая плеть (БП)', isCraftOnly: true, value: 3 },
    ],
  },
];

export const antisepticCombinations: CombinationItem[] = [
  {
    layer: 1,
    type: 'Кровь (КР)',
    addons: [
      { type: 'Бурая твирь (БТ)', isCraftOnly: false, value: 1 },
      { type: 'Черная твирь (ЧТ)', isCraftOnly: false, value: 1 },
      { type: 'Кровавая твирь (КТ)', isCraftOnly: false, value: 0 },
      { type: 'Савьюр (СА)', isCraftOnly: true, value: 2 },
      { type: 'Сечь (СЕ)', isCraftOnly: true, value: 0 },
      { type: 'Белая плеть (БП)', isCraftOnly: true, value: 0 },
    ],
  },
  {
    layer: 2,
    type: 'Кровь (КР)',
    addons: [
      { type: 'Бурая твирь (БТ)', isCraftOnly: false, value: 1 },
      { type: 'Черная твирь (ЧТ)', isCraftOnly: false, value: 0 },
      { type: 'Кровавая твирь (КТ)', isCraftOnly: false, value: 1 },
      { type: 'Савьюр (СА)', isCraftOnly: true, value: 0 },
      { type: 'Сечь (СЕ)', isCraftOnly: true, value: 2 },
      { type: 'Белая плеть (БП)', isCraftOnly: true, value: 0 },
    ],
  },
  {
    layer: 3,
    type: 'Кровь (КР)',
    addons: [
      { type: 'Бурая твирь (БТ)', isCraftOnly: false, value: 0 },
      { type: 'Черная твирь (ЧТ)', isCraftOnly: false, value: 1 },
      { type: 'Кровавая твирь (КТ)', isCraftOnly: false, value: 1 },
      { type: 'Савьюр (СА)', isCraftOnly: true, value: 0 },
      { type: 'Сечь (СЕ)', isCraftOnly: true, value: 0 },
      { type: 'Белая плеть (БП)', isCraftOnly: true, value: 2 },
    ],
  },
];

export const painkillerCombinations: CombinationItem[] = [
  {
    layer: 1,
    type: 'Кровь (КР)',
    addons: [
      { type: 'Мозг (МЗ)', isCraftOnly: false, value: 1 },
      { type: 'Сердце (СР)', isCraftOnly: false, value: 0 },
      { type: 'Печень (ПЧ)', isCraftOnly: false, value: 0 },
    ],
  },
  {
    layer: 2,
    type: 'Кровь (КР)',
    addons: [
      { type: 'Мозг (МЗ)', isCraftOnly: false, value: 0 },
      { type: 'Сердце (СР)', isCraftOnly: false, value: 1 },
      { type: 'Печень (ПЧ)', isCraftOnly: false, value: 0 },
    ],
  },
  {
    layer: 3,
    type: 'Кровь (КР)',
    addons: [
      { type: 'Мозг (МЗ)', isCraftOnly: false, value: 0 },
      { type: 'Сердце (СР)', isCraftOnly: false, value: 0 },
      { type: 'Печень (ПЧ)', isCraftOnly: false, value: 1 },
    ],
  },
];
