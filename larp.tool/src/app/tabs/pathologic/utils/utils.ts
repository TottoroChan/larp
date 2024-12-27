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

