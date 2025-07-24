import { Injectable } from '@angular/core';
import { SymptomTable } from '@app/tabs/pathologic/models/symptom-table.model';
import { CalculationResult } from '@app/tabs/pathologic/models/calculation-result.model';
import { ALLOWED_SYMPTOMS } from '@app/tabs/pathologic/utils/utils';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SymptomsService {
  private symptoms$ = new BehaviorSubject<SymptomTable[]>([]);
  canProceed$ = new BehaviorSubject<boolean>(false);

  validationResults = {
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

  canProceed(hasValues: boolean) {
    this.canProceed$.next(hasValues);
  }

  constructor(){
    this.cleanUp();
  }

  removeSymptom(index: number) {
    const current = this.symptoms$.value;
    current.splice(index, 1);
    this.symptoms$.next([...current]);
  }

  getSymptoms() {
    return this.symptoms$.asObservable();
  }

  cleanUp() {
    this.symptoms$.next([
    { value: ALLOWED_SYMPTOMS[0], layer: 1, isLast: false },
    { value: ALLOWED_SYMPTOMS[0], layer: 1, isLast: true },
    { value: ALLOWED_SYMPTOMS[0], layer: 2, isLast: false },
    { value: ALLOWED_SYMPTOMS[0], layer: 2, isLast: true },
    { value: ALLOWED_SYMPTOMS[0], layer: 3, isLast: false },
    { value: ALLOWED_SYMPTOMS[0], layer: 3, isLast: true },
  ]);
    this.canProceed(false);
  }

  public checkSymptomsTable(): CalculationResult {
    // Сбрасываем результаты проверки
    this.resetValidationResults();

    const symptomTable = this.symptoms$.value;

    // 1. Хотя бы одна нижняя ячейка не должна быть занята (иначе больной мёртв).
    this.validationResults.atLeastOneEmpty = symptomTable
      .filter((symptom) => symptom.isLast)
      .some((symptom) => symptom.value === ALLOWED_SYMPTOMS[0]);

    // Собираем все симптомы для дополнительных проверок
    const allSymptoms = symptomTable.map((symptom) => symptom.value);

    // 2. Одновременно в таблице не может быть двух пар симптомов (иначе больной мёртв).
    const pairs = this.getPairs(
      allSymptoms.filter((x) => x != ALLOWED_SYMPTOMS[0])
    );
    this.validationResults.noTwoPairs =
      pairs.map((pair) => pair.length).filter((pairLength) => pairLength > 2)
        .length < 2;

    // 3. Один симптом не может повторяться больше двух раз.
    this.validationResults.noTripleSymptoms = !pairs.some(
      (pair) => pair.length > 2
    );

    // 4. Симптом Ж может быть только в нижней ячейке.
    this.validationResults.zOnlyInBottom = !symptomTable.some(
      (symptom) => !symptom.isLast && symptom.value === 'Ж'
    );

    var empty1and2 = symptomTable.filter(
      (x) => (x.layer == 1 || x.layer == 2) && x.value == ALLOWED_SYMPTOMS[0]
    );
    var empty1and2isNotLast = empty1and2.filter((x) => x.isLast).length < empty1and2.length

    if (empty1and2.length && empty1and2isNotLast) {
      // 5. Симптом А не может находиться в 3 столбце
      this.validationResults.aNotInThirdCol = !symptomTable.some(
        (symptom) => symptom.layer === 3 && symptom.value === 'А'
      );

      // 10. Симптом Е может находиться только в 3 столбце
      this.validationResults.eOnlyInThirdCol = !symptomTable.some(
        (symptom) => symptom.layer != 3 && symptom.value === 'Е'
      );
    }

    var empty2and3 = symptomTable.filter(
      (x) => (x.layer == 2 || x.layer == 3) && x.value == ALLOWED_SYMPTOMS[0]
    );
    var empty2and3isNotLast = empty2and3.filter((x) => x.isLast).length < empty2and3.length

    if (empty2and3.length && empty2and3isNotLast) {
      // 6. Симптом Б не может находиться в 1 столбце
      this.validationResults.bNotInFirstCol = !symptomTable.some(
        (symptom) => symptom.layer === 1 && symptom.value === 'Б'
      );
      // 8. Симптом Г может находиться только в 1 столбце
      this.validationResults.gOnlyInFirstCol = !symptomTable.some(
        (symptom) => symptom.layer != 1 && symptom.value === 'Г'
      );
    }

    var empty1and3 = symptomTable.filter(
      (x) => (x.layer == 2 || x.layer == 3) && x.value == ALLOWED_SYMPTOMS[0]
    );
    var empty1and3isNotLast = empty1and3.filter((x) => x.isLast).length < empty2and3.length

    if (empty1and3.length && empty1and3isNotLast) {
      // 7. Симптом В не может находиться в 2 столбце
      this.validationResults.vNotInSecondCol = !symptomTable.some(
        (symptom) => symptom.layer === 2 && symptom.value === 'В'
      );

      // 9. Симптом Д может находиться только в 2 столбце
      this.validationResults.dOnlyInSecondCol = !symptomTable.some(
        (symptom) => symptom.layer != 2 && symptom.value === 'Д'
      );
    }

    // Общая проверка валидности
    this.validationResults.allValid = Object.values(
      this.validationResults
    ).every((result) => result === true);

    return this.getValidationMessage();
  }

  resetValidationResults() {
    for (const key in this.validationResults) {
      if (this.validationResults.hasOwnProperty(key)) {
        this.validationResults[key] = true;
      }
    }
  }

  getValidationMessage(): CalculationResult {
    if (this.validationResults.allValid) {
      return {
        isCalculated: false,
        result: '',
        isDead: false,
        healingTable: [],
      };
    }

    const messages = [];
    if (!this.validationResults.atLeastOneEmpty)
      messages.push('Хотя бы одна нижняя ячейка должна быть пустой');
    if (!this.validationResults.noTwoPairs)
      messages.push('Не может быть двух пар симптомов одновременно');
    if (!this.validationResults.noTripleSymptoms)
      messages.push('Симптом не может повторяться больше двух раз');
    if (!this.validationResults.zOnlyInBottom)
      messages.push('Симптом Ж может быть только в нижней ячейке');
    if (!this.validationResults.aNotInThirdCol)
      messages.push('Симптом А не может находиться в 3 столбце');
    if (!this.validationResults.bNotInFirstCol)
      messages.push('Симптом Б не может находиться в 1 столбце');
    if (!this.validationResults.vNotInSecondCol)
      messages.push('Симптом В не может находиться в 2 столбце');
    if (!this.validationResults.gOnlyInFirstCol)
      messages.push('Симптом Г может находиться только в 1 столбце');
    if (!this.validationResults.dOnlyInSecondCol)
      messages.push('Симптом Д может находиться только в 2 столбце');
    if (!this.validationResults.eOnlyInThirdCol)
      messages.push('Симптом Е может находиться только в 3 столбце');

    return {
      isCalculated: false,
      result: `Найдены ошибки: ${messages.join(';')}`,
      isDead: true,
      healingTable: [],
    };
  }

  private getPairs(symptoms: string[]): string[][] {
    const groups: { [key: string]: string[] } = {};

    symptoms.forEach((element) => {
      if (!groups[element]) {
        groups[element] = [];
      }
      groups[element].push(element);
    });

    return Object.values(groups);
  }
}
