import { MaskitoOptions } from '@maskito/core';

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
        return 'Симптомы слой 1';
        break;
      case 2:
        return 'Симптомы слой 2';
        break;
      case 3:
        return 'Симптомы слой 3';
        break;
      case 4:
        return 'Лекарства';
        break;
      case 5:
        return 'Сводка';
        break;
      default:
        break;
    }
  }

const ALLOWED_SYMPTOMS = ['А', 'Б', 'В', 'Г', 'Д', 'Ж'];

export const allowedSymptomsMask: MaskitoOptions = {
  mask: /^[А-ГДЖ]$/, // Регулярка для разрешённых символов
};
