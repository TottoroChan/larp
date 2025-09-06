import { Injectable } from '@angular/core';
import { SymptomsService } from './symptoms.service';
import { MedicineService } from './medicine.service';
import { combineLatest, map, Observable } from 'rxjs';
import { Medicine } from '../models/medicine-list.model';
import {
  ALLOWED_SYMPTOMS,
  PATHOLOGIC_DEBUG_MODE,
  REQUIRED_POWER,
} from '@app/tabs/pathologic/utils/utils';
import {
  CalculationResult,
  HealingTable,
} from '../models/calculation-result.model';
import { SymptomTable } from '../models/symptom-table.model';

@Injectable({
  providedIn: 'root',
})
export class PathologicService {
  canProceedSymptoms$: Observable<boolean>;
  canProceedMedicine$: Observable<boolean>;

  constructor(
    private symptomsService: SymptomsService,
    private medicineService: MedicineService
  ) {
    this.canProceedSymptoms$ = this.symptomsService.canProceed$;
    this.canProceedMedicine$ = this.medicineService.canProceed$;
  }

  canProceed(currentStep: number) {
    return combineLatest([
      this.canProceedSymptoms$,
      this.canProceedMedicine$,
    ]).pipe(
      map(([symptoms, meds]) => {
        switch (currentStep) {
          case 1:
            return symptoms;
          case 2:
            return meds;
          default:
            return true;
        }
      })
    );
  }

  calculate(): Observable<CalculationResult> {
    return combineLatest([
      this.medicineService.getMeds(),
      this.symptomsService.getSymptoms(),
    ]).pipe(
      map(([meds, symptoms]) => {
        const totalPower = this.calculatePower(meds);
        const healingTable = this.prepareHealingTable(symptoms);
        const prioritizedSymptoms = this.prioritizeSymptoms(healingTable);

        const result = this.processSymptomsByLayer(
          prioritizedSymptoms,
          totalPower
        );

        return {
          isCalculated: true,
          result: 'Проведено лечение симптомов.',
          isDead: false,
          healingTable: result,
        };
      })
    );
  }

  checkSymptomsTable(): CalculationResult {
    return this.symptomsService.checkSymptomsTable();
  }

  cleanUp() {
    this.medicineService.cleanUp();
    this.symptomsService.cleanUp();
  }

  private prepareHealingTable(symptoms: SymptomTable[]): HealingTable[] {
    const symptomsToSkip: number[] = [];

    return symptoms
      .map((symptom, index) => {
        if (
          symptom.value === ALLOWED_SYMPTOMS[0] ||
          symptomsToSkip.includes(index)
        ) {
          return undefined;
        }

        const pairIndex = symptoms.findIndex(
          (s, i) => s.value === symptom.value && i !== index
        );
        const hasPair = pairIndex > -1;

        if (hasPair) {
          symptomsToSkip.push(pairIndex);
        }

        return {
          id: index,
          symptom: symptom.value,
          isPair: hasPair,
          requiredPower: hasPair
            ? REQUIRED_POWER[symptom.value] * 2
            : REQUIRED_POWER[symptom.value],
          layer: symptom.layer,
          isLast: symptom.isLast,
          isHealed: false,
          result: '',
        };
      })
      .filter((x): x is HealingTable => x !== undefined);
  }

  private processSymptomsByLayer(
    symptoms: HealingTable[],
    totalPower: number[]
  ): HealingTable[][] {
    const calculationData = [
      symptoms.filter((x) => x.layer === 1),
      symptoms.filter((x) => x.layer === 2),
      symptoms.filter((x) => x.layer === 3),
    ];

    calculationData.forEach((layerSymptoms, layerIndex) => {
      if (layerSymptoms.length) {
        const [first, second] = layerSymptoms;
        this.healSymptom(totalPower[layerIndex], first);
        if (second) {
          var leftoverPower = first.isHealed
            ? totalPower[layerIndex] - first.requiredPower
            : totalPower[layerIndex];
          this.healSymptom(leftoverPower, second);
        }
      }
    });

    return calculationData;
  }

  private healSymptom(power: number, healingData: HealingTable) {
    if (healingData.requiredPower > 0) {
      if (healingData.requiredPower > power) {
        healingData.result = `Силы лечения не хватает.`;

        if(PATHOLOGIC_DEBUG_MODE){
           healingData.result += `\n Сила влияния: ${power}
                    Сложность ${healingData.isPair ? 'парного' : ''} 
                    симптома ${healingData.symptom}: ${healingData.requiredPower}`
        }
      } else {
        healingData.result = ` ${healingData.isPair ? 'Парный симптом' : 'Симптом'} ${healingData.symptom} вылечен`;
        healingData.isHealed = true;
      }
    }
  }

  private prioritizeSymptoms(elements: HealingTable[]): HealingTable[] {
    return elements.sort((a, b) => {
      // 1. Сначала по layer (по возрастанию)
      if (a.layer !== b.layer) {
        return a.layer - b.layer;
      }

      // 2. Затем isPair (true идёт раньше false)
      if (a.isPair !== b.isPair) {
        return Number(b.isPair) - Number(a.isPair);
      }

      // 3. Затем по requiredPower (по возрастанию)
      if (a.requiredPower !== b.requiredPower) {
        return a.requiredPower - b.requiredPower;
      }

      // 4. Наконец, по isLast (true идёт раньше false)
      return Number(b.isLast) - Number(a.isLast);
    });
  }

  private calculatePower(meds: Medicine[]) {
    let totalPower = [0, 0, 0];

    meds.filter(x => !x.isUseless).forEach((x) => {
      switch (x.type) {
        case 'иммуник':
        case 'антибиотик':
          totalPower = x.power.map((num, index) => totalPower[index] + num);
          break;
        case 'антисептик':
        case 'обезболивающее':
          totalPower = x.power.map((num, index) => totalPower[index] - num);
          break;

        default:
          break;
      }
    });

    return totalPower;
  }
}
