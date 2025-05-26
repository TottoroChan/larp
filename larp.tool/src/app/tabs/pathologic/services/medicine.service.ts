import { Injectable } from '@angular/core';
import { SymptomTable } from '@app/tabs/pathologic/models/symptom-table.model';
import { CalculationResult } from '@app/tabs/pathologic/models/calculation-result.model';
import {
  ALLOWED_SYMPTOMS,
  antibioticCombinations,
  antisepticCombinations,
  immuneCombinations,
  painkillerCombinations,
} from '@app/tabs/pathologic/utils/utils';
import { CombinationItem } from '../models/combination-item.model';
import { Medicine } from '../models/meds-list.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MedicineService {
  private medicineList$ = new BehaviorSubject<Medicine[]>([]);
  private immuneLimit$ = new BehaviorSubject<number>(1);
  private antibLimit$ = new BehaviorSubject<number>(1);

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

  public identifyMedicine(
    firstPart: string,
    secondPart: string
  ): Medicine | null {
    let type = null;
    if (this.isMedExist(immuneCombinations, firstPart, secondPart)) {
      type = 'иммуник';
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
    if (!type) {
      return null;
    }
    return { type: type, value: `${firstPart}${secondPart}` };
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
        return antibCount < this.immuneLimit$.value
          ? ''
          : 'Достигнут лимит антибиотиков.';
        break;
      default:
        return '';
        break;
    }
  }
}
