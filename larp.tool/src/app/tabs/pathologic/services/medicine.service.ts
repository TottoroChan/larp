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

    switch (medicine.type) {
      case 'обезболивающее':
        this.antibLimit$.next(antibLimit + 1);
        break;
      case 'антисептик':
        this.immuneLimit$.next(immuneLimit + 1);
        break;
      case 'антибиотик':
        let antibCount = this.medicineList$
          .getValue()
          .filter((x) => x.type == 'антибиотик').length;
        if (antibCount >= this.antibLimit$.value) {
          medicine.isUseless = true;
        }
        break;
      case 'иммуник':
        let immuneCount = this.medicineList$
          .getValue()
          .filter((x) => x.type == 'иммуник').length;
        if (immuneCount >= this.immuneLimit$.value) {
          medicine.isUseless = true;
        }
        break;
      default:
        break;
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
      this.antibLimit$.next(antibLimit - 1);
    }
    if (med.type == 'антисептик') {
      this.immuneLimit$.next(immuneLimit - 1);
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
    let result = this.identify(`${firstPart}${secondPart}`);
    if (!result) {
      result = this.identify(
        `${secondPart}${firstPart}`,
        `${firstPart}${secondPart}`
      );
    }

    return result;
  }

  private identify(meds: string, originName: string = null): Medicine | null {
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
      const medicine = this.findMedicine(
        combo.source,
        meds.slice(0, 2),
        meds.slice(2, 4)
      );
      if (medicine) {
        return {
          type: combo.type,
          value: originName ?? meds,
          power: medicine.power,
          isUseless: false,
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
      .filter((item) => getTextInParentheses(item.type) === firstPart)
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
