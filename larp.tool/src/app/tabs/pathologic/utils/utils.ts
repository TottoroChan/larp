import { MaskitoOptions } from '@maskito/core';
import { SymptomTable } from '@app/tabs/pathologic/models/symptom.model';
import { CalculationResult } from '@app/tabs/pathologic/models/calculation-result.model';

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
    case 1:
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

const ALLOWED_SYMPTOMS = ['А', 'Б', 'В', 'Г', 'Д', 'Ж'];

export const allowedSymptomsMask: MaskitoOptions = {
  mask: /^[А-ГДЖ]$/, // Регулярка для разрешённых символов
};

const validationResults = {
  atLeastOneEmpty: true,
  noTwoPairs: true,
  noTripleSymptoms: true,
  zOnlyInBottom: true,
  aNotInThirdCol: true,
  bNotInFirstCol: true,
  vNotInSecondCol: true,
  gOnlyInFirstCol: true,
  dOnlyInSecondCol: true,
  eOnlyInThirdCol: true,
  allValid: true,
};

export const checkSymptomsTable = (
  symptomTable: SymptomTable[]
): CalculationResult => {
  // Сбрасываем результаты проверки
  resetValidationResults();

  // 1. Хотя бы одна нижняя ячейка не должна быть занята (иначе больной мёртв).
  validationResults.atLeastOneEmpty = symptomTable
    .filter((symptom) => symptom.isLast)
    .some((symptom) => symptom.value === '');

  // Собираем все симптомы для дополнительных проверок
  const allSymptoms = symptomTable.map((symptom) => symptom.value);

  // 2. Одновременно в таблице не может быть двух пар симптомов (иначе больной мёртв).
  const pairs = getPairs(allSymptoms.filter((x) => x != ''));
  validationResults.noTwoPairs =
    pairs.map((pair) => pair.length).filter((pairLength) => pairLength > 2)
      .length < 2;

  // 3. Один симптом не может повторяться больше двух раз.
  validationResults.noTripleSymptoms = !pairs.some((pair) => pair.length > 2);

  // 4. Симптом Ж может быть только в нижней ячейке.
  validationResults.zOnlyInBottom = !symptomTable.some(
    (symptom) => !symptom.isLast && symptom.value === 'Ж'
  );

  // 5. Симптом А не может находиться в 3 столбце
  validationResults.aNotInThirdCol = !symptomTable.some(
    (symptom) => symptom.layer === 3 && symptom.value === 'А'
  );

  // 6. Симптом Б не может находиться в 1 столбце
  validationResults.bNotInFirstCol = !symptomTable.some(
    (symptom) => symptom.layer === 1 && symptom.value === 'Б'
  );

  // 7. Симптом В не может находиться в 2 столбце
  validationResults.vNotInSecondCol = !symptomTable.some(
    (symptom) => symptom.layer === 2 && symptom.value === 'В'
  );

  // 8. Симптом Г может находиться только в 1 столбце
  validationResults.gOnlyInFirstCol = !symptomTable.some(
    (symptom) => symptom.layer != 1 && symptom.value === 'Г'
  );

  // 9. Симптом Д может находиться только в 2 столбце
  validationResults.dOnlyInSecondCol = !symptomTable.some(
    (symptom) => symptom.layer != 2 && symptom.value === 'Д'
  );

  // 10. Симптом Е может находиться только в 3 столбце
  validationResults.eOnlyInThirdCol = !symptomTable.some(
    (symptom) => symptom.layer != 3 && symptom.value === 'Е'
  );

  // Общая проверка валидности
  validationResults.allValid = Object.values(validationResults).every(
    (result) => result === true
  );

  return getValidationMessage();
};

function resetValidationResults() {
  for (const key in validationResults) {
    if (validationResults.hasOwnProperty(key)) {
      validationResults[key] = true;
    }
  }
}

function getValidationMessage(): CalculationResult {
  if (validationResults.allValid) {
    return { isCalculated: false, result: '', isDead: false };
  }

  const messages = [];
  if (!validationResults.atLeastOneEmpty)
    messages.push('Хотя бы одна нижняя ячейка должна быть пустой');
  if (!validationResults.noTwoPairs)
    messages.push('Не может быть двух пар симптомов одновременно');
  if (!validationResults.noTripleSymptoms)
    messages.push('Симптом не может повторяться больше двух раз');
  if (!validationResults.zOnlyInBottom)
    messages.push('Симптом Ж может быть только в нижней ячейке');
  if (!validationResults.aNotInThirdCol)
    messages.push('Симптом А не может находиться в 3 столбце');
  if (!validationResults.bNotInFirstCol)
    messages.push('Симптом Б не может находиться в 1 столбце');
  if (!validationResults.vNotInSecondCol)
    messages.push('Симптом В не может находиться в 2 столбце');
  if (!validationResults.gOnlyInFirstCol)
    messages.push('Симптом Г может находиться только в 1 столбце');
  if (!validationResults.dOnlyInSecondCol)
    messages.push('Симптом Д может находиться только в 2 столбце');
  if (!validationResults.eOnlyInThirdCol)
    messages.push('Симптом Е может находиться только в 3 столбце');

  return {
    isCalculated: false,
    result: `Найдены ошибки: ${messages.join(';')}`,
    isDead: true,
  };
}

function getPairs(symptoms: string[]): string[][] {
  const groups: { [key: string]: string[] } = {};

  symptoms.forEach((element) => {
    if (!groups[element]) {
      groups[element] = [];
    }
    groups[element].push(element);
  });

  return Object.values(groups);
}
