import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SymptomTable } from '@app/tabs/pathologic/models/symptom.model';
import { CalculationResult } from '@app/tabs/pathologic/models/calculation-result.model';
import { checkSymptomsTable } from '@app/tabs/pathologic/utils/utils';

@Injectable({
  providedIn: 'root',
})
export class PathologicService {
  private symptoms$ = new BehaviorSubject<SymptomTable[]>([
    { value: 'А', layer: 1, isLast: false },
    { value: '', layer: 1, isLast: true },
    { value: 'Е', layer: 2, isLast: false },
    { value: 'Б', layer: 2, isLast: true },
    { value: 'Е', layer: 3, isLast: false },
    { value: 'Ж', layer: 3, isLast: true },
  ]);
  private meds$ = new BehaviorSubject<string[]>(['sadasd', 'asdasd', 'asdasd']);

  addSymptomsRow(layer: number, symptoms: SymptomTable) {
    const current = this.symptoms$.value;
    current[layer] = symptoms;
    this.symptoms$.next(current);
  }

  addMed(med: string) {
    const current = this.meds$.value;
    this.meds$.next([...current, med]);
  }

  removeSymptom(index: number) {
    const current = this.symptoms$.value;
    current.splice(index, 1);
    this.symptoms$.next([...current]);
  }

  removeMed(index: number) {
    const current = this.meds$.value;
    current.splice(index, 1);
    this.meds$.next([...current]);
  }

  getSymptoms() {
    return this.symptoms$.asObservable();
  }

  getMeds() {
    return this.meds$.asObservable();
  }

  clearSymptoms() {
    this.symptoms$.next([]);
  }

  calculate() {
    throw new Error('Method not implemented.');
  }

  validateStep(currentStep: number): CalculationResult {
    var symptoms = this.symptoms$.value;
    var meds = this.meds$.value;
    switch (currentStep) {
      case 1:
        return checkSymptomsTable(symptoms);
        break;
      case 2:
        break;

      default:
        break;
    }

    return { isCalculated: false, result: '', isDead: false };
  }
}
