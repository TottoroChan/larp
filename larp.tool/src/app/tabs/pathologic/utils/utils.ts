import { MaskitoOptions } from '@maskito/core';
import { CombinationItem } from '@app/tabs/pathologic/models/combination-item.model';
import { SymptomTable } from '@app/tabs/pathologic/models/symptom-table.model';

export const validateSymptomCode = (control: any) => {
  const value = control.value;
  const isValid = /^[А-Ж][1-3][0-30]$/.test(value);
  return isValid ? null : { invalidSymptomCode: true };
};

export const validateMedicineCode = (control: any) => {
  const value = control.value;
  const isValid =
    /^(АБ|АС|ОБ|ИМ)(ФАРМ|КР|МЗ|СР|ПЧ|БТ|ЧТ|КТ|СА|СЕ|БП)([0-9]{2})$/.test(value);
  return isValid ? null : { invalidMedicineCode: true };
};

export const getWizardTitle = (step: number) => {
  switch (step) {
    case 0:
      return 'Результат лечения';
      break;
    case 1:
      return 'Симптомы';
      break;
    case 2:
      return 'Лекарства';
      break;
    case 3:
      return 'Сводка';
      break;
    default:
      break;
  }
};

export const ALLOWED_SYMPTOMS = ['-', 'А', 'Б', 'В', 'Г', 'Д', 'Е', 'Ж'];
export const ALLOWED_MEDS = [
  'БТ',
  'ЧТ',
  'КТ',
  'СА',
  'СЕ',
  'БП',
  'МЗ',
  'СР',
  'ПЧ',
  'КР',
];

export const allowedSymptomsMask: MaskitoOptions = {
  mask: /^[А-ГДЖ]$/, // Регулярка для разрешённых символов
};

export const getTextInParentheses = (input: string): string | null => {
  const regex = /\(([^)]+)\)/;
  const match = input.match(regex);
  return match ? match[1] : null;
};

export const immuneCombinations: CombinationItem[] = [
  {
    type: 'Бурая твирь (БТ)',
    addons: [
      { type: 'Бурая твирь (БТ)', isCraftOnly: false, power: [2, 2, 0] },
    ],
  },
  {
    type: 'Черная твирь (ЧТ)',
    addons: [
      { type: 'Бурая твирь (БТ)', isCraftOnly: false, power: [2, 1, 1] },
      { type: 'Черная твирь (ЧТ)', isCraftOnly: false, power: [2, 0, 2] },
    ],
  },
  {
    type: 'Кровавая твирь (КТ)',
    addons: [
      { type: 'Бурая твирь (БТ)', isCraftOnly: false, power: [1, 2, 1] },
      { type: 'Черная твирь (ЧТ)', isCraftOnly: false, power: [1, 1, 2] },
      { type: 'Кровавая твирь (КТ)', isCraftOnly: false, power: [0, 2, 2] },
    ],
  },
  {
    type: 'Савьюр (СА)',
    addons: [
      { type: 'Бурая твирь (БТ)', isCraftOnly: true, power: [3, 1, 0] },
      { type: 'Черная твирь (ЧТ)', isCraftOnly: true, power: [3, 0, 1] },
      { type: 'Кровавая твирь (КТ)', isCraftOnly: false, power: [2, 1, 1] },
      { type: 'Савьюр (СА)', isCraftOnly: true, power: [4, 0, 0] },
    ],
  },
  {
    type: 'Сечь (СЕ)',
    addons: [
      { type: 'Бурая твирь (БТ)', isCraftOnly: true, power: [1, 3, 0] },
      { type: 'Черная твирь (ЧТ)', isCraftOnly: false, power: [1, 2, 1] },
      { type: 'Кровавая твирь (КТ)', isCraftOnly: true, power: [0, 3, 1] },
      { type: 'Савьюр (СА)', isCraftOnly: false, power: [2, 2, 0] },
      { type: 'Сечь (СЕ)', isCraftOnly: true, power: [0, 4, 0] },
    ],
  },
  {
    type: 'Белая плеть (БП)',
    addons: [
      { type: 'Бурая твирь (БТ)', isCraftOnly: false, power: [1, 1, 2] },
      { type: 'Черная твирь (ЧТ)', isCraftOnly: true, power: [1, 0, 3] },
      { type: 'Кровавая твирь (КТ)', isCraftOnly: true, power: [0, 1, 3] },
      { type: 'Савьюр (СА)', isCraftOnly: false, power: [2, 0, 2] },
      { type: 'Сечь (СЕ)', isCraftOnly: false, power: [0, 2, 2] },
      { type: 'Белая плеть (БП)', isCraftOnly: true, power: [0, 0, 4] },
    ],
  },
];

export const antibioticCombinations: CombinationItem[] = [
  {
    type: 'Мозг (МЗ)',
    addons: [
      { type: 'Бурая твирь (БТ)', isCraftOnly: false, power: [4, 1, 1] },
      { type: 'Черная твирь (ЧТ)', isCraftOnly: false, power: [4, 0, 2] },
      { type: 'Кровавая твирь (КТ)', isCraftOnly: false, power: [3, 1, 2] },
      { type: 'Савьюр (СА)', isCraftOnly: true, power: [5, 0, 1] },
      { type: 'Сечь (СЕ)', isCraftOnly: false, power: [3, 2, 1] },
      { type: 'Белая плеть (БП)', isCraftOnly: false, power: [3, 0, 3] },
    ],
  },
  {
    type: 'Сердце (СР)',
    addons: [
      { type: 'Бурая твирь (БТ)', isCraftOnly: false, power: [2, 4, 0] },
      { type: 'Черная твирь (ЧТ)', isCraftOnly: false, power: [2, 3, 1] },
      { type: 'Кровавая твирь (КТ)', isCraftOnly: false, power: [1, 4, 1] },
      { type: 'Савьюр (СА)', isCraftOnly: false, power: [3, 3, 0] },
      { type: 'Сечь (СЕ)', isCraftOnly: true, power: [1, 5, 0] },
      { type: 'Белая плеть (БП)', isCraftOnly: false, power: [1, 3, 2] },
    ],
  },
  {
    type: 'Печень (ПЧ)',
    addons: [
      { type: 'Бурая твирь (БТ)', isCraftOnly: false, power: [1, 2, 3] },
      { type: 'Черная твирь (ЧТ)', isCraftOnly: false, power: [1, 1, 4] },
      { type: 'Кровавая твирь (КТ)', isCraftOnly: false, power: [0, 2, 4] },
      { type: 'Савьюр (СА)', isCraftOnly: false, power: [2, 1, 3] },
      { type: 'Сечь (СЕ)', isCraftOnly: false, power: [0, 3, 3] },
      { type: 'Белая плеть (БП)', isCraftOnly: true, power: [0, 1, 5] },
    ],
  },
];

export const antisepticCombinations: CombinationItem[] = [
  {
    type: 'Кровь (КР)',
    addons: [
      { type: 'Бурая твирь (БТ)', isCraftOnly: false, power: [1, 1, 0] },
      { type: 'Черная твирь (ЧТ)', isCraftOnly: false, power: [1, 0, 1] },
      { type: 'Кровавая твирь (КТ)', isCraftOnly: false, power: [0, 1, 1] },
      { type: 'Савьюр (СА)', isCraftOnly: true, power: [2, 0, 0] },
      { type: 'Сечь (СЕ)', isCraftOnly: true, power: [0, 2, 0] },
      { type: 'Белая плеть (БП)', isCraftOnly: true, power: [0, 0, 2] },
    ],
  },
];

export const painkillerCombinations: CombinationItem[] = [
  {
    type: 'Кровь (КР)',
    addons: [
      { type: 'Мозг (МЗ)', isCraftOnly: false, power: [2, 0, 1] },
      { type: 'Сердце (СР)', isCraftOnly: false, power: [1, 2, 0] },
      { type: 'Печень (ПЧ)', isCraftOnly: false, power: [0, 1, 2] },
    ],
  },
];

export const findAllowedMedicineParts = (firstPart: string): string[] => {
  if (firstPart) {
    return [
      ...medsParts(firstPart, immuneCombinations),
      ...medsParts(firstPart, antibioticCombinations),
      ...medsParts(firstPart, antisepticCombinations),
      ...medsParts(firstPart, painkillerCombinations),
    ];
  }

  return [];
};

const medsParts = (firstPart: string, combination: CombinationItem[]) => {
  return combination
    .filter((item) => getTextInParentheses(item.type) === firstPart)
    .flatMap((item) => item.addons)
    .flatMap((addon) => getTextInParentheses(addon.type));
};

 export const REQUIRED_POWER: Record<string, number> = {
    Ж: 5,
    А: 4,
    Б: 4,
    В: 4,
    Г: 3,
    Д: 3,
    Е: 3,
  };

 export const DEFAULT_SYMPTOMS_TABLE : SymptomTable[] = [
    { value: ALLOWED_SYMPTOMS[0], layer: 1, isLast: false },
    { value: ALLOWED_SYMPTOMS[0], layer: 1, isLast: true },
    { value: ALLOWED_SYMPTOMS[0], layer: 2, isLast: false },
    { value: ALLOWED_SYMPTOMS[0], layer: 2, isLast: true },
    { value: ALLOWED_SYMPTOMS[0], layer: 3, isLast: false },
    { value: ALLOWED_SYMPTOMS[0], layer: 3, isLast: true },
  ]