import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SymptomTable } from '@app/tabs/pathologic/models/symptom-table.model';
import { CalculationResult } from '@app/tabs/pathologic/models/calculation-result.model';
import {
  ALLOWED_SYMPTOMS,
  antibioticCombinations,
  antisepticCombinations,
  immuneCombinations,
  painkillerCombinations,
} from '@app/tabs/pathologic/utils/utils';
import { SymptomsValidationService } from '@app/tabs/pathologic/services/symptoms-validation.service';
import {
  MedsItem,
  MedsList,
} from '@app/tabs/pathologic/models/meds-list.model';
import { CombinationItem } from '@app/tabs/pathologic/models/combination-item.model';

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

  private meds$ = new BehaviorSubject<MedsList>({
    limits: {
      antibiotics: 1,
      immunes: 1,
    },
    meds: [],
  });

  constructor(private symptomsValidationService: SymptomsValidationService) {}

  addSymptomsRow(layer: number, symptoms: SymptomTable) {
    const current = this.symptoms$.value;
    current[layer] = symptoms;
    this.symptoms$.next(current);
  }

  addMed(firstPart: string, secondPart: string) {
    let type;

    if (this.isMedExist(immuneCombinations, firstPart, secondPart)) {
      type = 'имунник';
    }
    if (this.isMedExist(antibioticCombinations, firstPart, secondPart)) {
      type = 'антибиотик';
    }
    if (this.isMedExist(antisepticCombinations, firstPart, secondPart)) {
      type = 'антисептик';
    }
    if (this.isMedExist(painkillerCombinations, firstPart, secondPart)) {
      type = 'обезболивающее';
    }
    const current = this.meds$.value;
    const medItem = { type: type, value: `${firstPart}${secondPart}` };
    
    if (medItem.type == 'обезболивающее') {
      current.limits.antibiotics++;
    }
    if (medItem.type == 'антисептик') {
      current.limits.immunes++;
    }
    this.meds$.next({
      meds: [...current.meds, medItem}],
      limits: current.limits
    });
  }

  private isMedExist(
    combination: CombinationItem[],
    firstPart: string,
    secondPart: string
  ): boolean {
    return combination.some(
      (x) =>
        x.type.includes(`(${firstPart})`) &&
        x.addons.some((y) => y.type.includes(`(${secondPart})`))
    );
  }

  removeSymptom(index: number) {
    const current = this.symptoms$.value;
    current.splice(index, 1);
    this.symptoms$.next([...current]);
  }

  removeMed(index: number) {
    const current = this.meds$.value;
    const med = current.meds[index];
    current.meds.splice(index, 1);
    if (med.type == 'обезболивающее') {
      current.limits.antibiotics--;
    }
    if (med.type == 'антисептик') {
      current.limits.immunes--;
    }
    this.meds$.next({
      meds: [...current.meds],
      limits: current.limits
    });
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
        return this.symptomsValidationService.checkSymptomsTable(symptoms);
        break;
      case 2:
        break;

      default:
        break;
    }

    return { isCalculated: false, result: '', isDead: false };
  }
}
