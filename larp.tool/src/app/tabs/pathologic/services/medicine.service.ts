import { Injectable } from '@angular/core';
import { SymptomTable } from '@app/tabs/pathologic/models/symptom-table.model';
import { CalculationResult } from '@app/tabs/pathologic/models/calculation-result.model';
import {
  ALLOWED_SYMPTOMS,
  antibioticCombinations,
  antisepticCombinations,
  getTextInParentheses,
  immuneCombinations,
  painkillerCombinations,
} from '@app/tabs/pathologic/utils/utils';
import { AddonItem, CombinationItem } from '../models/combination-item.model';
import { Medicine } from '../models/medicine-list.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MedicineService {
  private medicineList$ = new BehaviorSubject<Medicine[]>([]);
  private immuneLimit$ = new BehaviorSubject<number>(1);
  private antibLimit$ = new BehaviorSubject<number>(1);
  canProceed$ = new BehaviorSubject<boolean>(false);

  canProceed(hasValues: boolean) {
    this.canProceed$.next(hasValues);
  }

  getMeds() {
    return this.medicineList$.asObservable();
  }

  getImmunesLimits() {
    return this.immuneLimit$.asObservable();
  }

  getAntibioticsLimits() {
    return this.antibLimit$.asObservable();
  }

  addMedicine(medicine: Medicine) {
    const current = this.medicineList$.value;
    let immuneLimit = this.immuneLimit$.value;
    let antibLimit = this.antibLimit$.value;

    if (medicine.type == 'обезболивающее') {
      this.antibLimit$.next(antibLimit + 1);
    }
    if (medicine.type == 'антисептик') {
      this.immuneLimit$.next(immuneLimit + 1);
    }
    this.medicineList$.next([...current, medicine]);
  }

  removeMed(index: number) {
    const current = this.medicineList$.value;
    let immuneLimit = this.immuneLimit$.value;
    let antibLimit = this.antibLimit$.value;

    const med = current[index];
    current.splice(index, 1);

    if (med.type == 'обезболивающее') {
      this.antibLimit$.next(antibLimit++);
    }
    if (med.type == 'антисептик') {
      this.immuneLimit$.next(immuneLimit++);
    }

    this.medicineList$.next([...current]);
  }

  cleanUp() {
    this.medicineList$.next([]);
  }

  public identifyMedicine(
    firstPart: string,
    secondPart: string
  ): Medicine | null {
    const combinations: {
      type: 'иммуник' | 'антибиотик' | 'антисептик' | 'обезболивающее';
      source: CombinationItem[];
    }[] = [
      { type: 'иммуник', source: immuneCombinations },
      { type: 'антибиотик', source: antibioticCombinations },
      { type: 'антисептик', source: antisepticCombinations },
      { type: 'обезболивающее', source: painkillerCombinations },
    ];

    for (const combo of combinations) {
      const medicine = this.findMedicine(combo.source, firstPart, secondPart);
      if (medicine) {
        return {
          type: combo.type,
          value: `${firstPart}${secondPart}`,
          power: medicine.power,
        };
      }
    }

    return null;
  }

  private findMedicine(
    combinations: CombinationItem[],
    firstPart: string,
    secondPart: string
  ): AddonItem {
    return combinations
      .filter((item) =>  getTextInParentheses(item.type) === firstPart)
      .flatMap((item) => item.addons)
      .find((addon) => getTextInParentheses(addon.type) === secondPart);
  }

  public checkLimits(medicine: Medicine) {
    const currentList = this.medicineList$.value;
    switch (medicine.type) {
      case 'иммуник':
        const immunesCount = currentList.filter(
          (x) => x.type == 'иммуник'
        ).length;
        return immunesCount < this.immuneLimit$.value
          ? ''
          : 'Достигнут лимит имунников.';
        break;
      case 'антибиотик':
        const antibCount = currentList.filter(
          (x) => x.type == 'антибиотик'
        ).length;
        return antibCount < this.antibLimit$.value
          ? ''
          : 'Достигнут лимит антибиотиков.';
        break;
      default:
        return '';
        break;
    }
  }
}
