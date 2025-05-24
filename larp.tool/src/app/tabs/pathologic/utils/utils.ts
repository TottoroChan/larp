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

export const ALLOWED_SYMPTOMS = ['-', 'А', 'Б', 'В', 'Г', 'Д', 'Е', 'Ж'];

export const allowedSymptomsMask: MaskitoOptions = {
  mask: /^[А-ГДЖ]$/, // Регулярка для разрешённых символов
};

function getTextInParentheses(input: string): string | null {
  const regex = /\(([^)]+)\)/;
  const match = input.match(regex);
  return match ? match[1] : null;
}
