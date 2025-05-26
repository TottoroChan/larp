import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SymptomTable } from '@app/tabs/pathologic/models/symptom-table.model';
import { CalculationResult } from '@app/tabs/pathologic/models/calculation-result.model';
import {
  ALLOWED_SYMPTOMS,
} from '@app/tabs/pathologic/utils/utils';
import { SymptomsValidationService } from '@app/tabs/pathologic/services/symptoms-validation.service';

@Injectable({
  providedIn: 'root',
})
export class PathologicService {
  private symptoms$ = new BehaviorSubject<SymptomTable[]>([
    { value: ALLOWED_SYMPTOMS[0], layer: 1, isLast: false },
    { value: ALLOWED_SYMPTOMS[0], layer: 1, isLast: true },
    { value: ALLOWED_SYMPTOMS[0], layer: 2, isLast: false },
    { value: ALLOWED_SYMPTOMS[0], layer: 2, isLast: true },
    { value: ALLOWED_SYMPTOMS[0], layer: 3, isLast: false },
    { value: ALLOWED_SYMPTOMS[0], layer: 3, isLast: true },
  ]);

  constructor(private symptomsValidationService: SymptomsValidationService) {}

  removeSymptom(index: number) {
    const current = this.symptoms$.value;
    current.splice(index, 1);
    this.symptoms$.next([...current]);
  }

  getSymptoms() {
    return this.symptoms$.asObservable();
  }

  clearSymptoms() {
    this.symptoms$.next([]);
  }

  calculate() {
    throw new Error('Method not implemented.');
  }

  validateSymptomsStep(): CalculationResult {
    var symptoms = this.symptoms$.value;
    return this.symptomsValidationService.checkSymptomsTable(symptoms);
  }
}
