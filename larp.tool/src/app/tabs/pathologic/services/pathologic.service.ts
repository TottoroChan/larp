import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SymptomTable } from '@app/tabs/pathologic/models/symptom.model';

@Injectable({
  providedIn: 'root',
})
export class PathologicService {
  private symptoms$ = new BehaviorSubject<SymptomTable[]>([
    { symptomFirst: 'А', symptomSecond: '' },
    { symptomFirst: 'Д', symptomSecond: 'Ж' },
    { symptomFirst: 'Б', symptomSecond: '' },
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
}
