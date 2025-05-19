import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Symptom } from '@app/tabs/pathologic/models/symptom.model';

@Injectable({
  providedIn: 'root',
})
export class PathologicService {
  private symptoms$ = new BehaviorSubject<Symptom[]>(
    []
  );
  private meds$ = new BehaviorSubject<string[]>(
    []
  );

  addSymptom(symptom: string, layer: number) {
    const current = this.symptoms$.value;
    this.symptoms$.next([...current, { symptom: symptom, layer: layer }]);
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
