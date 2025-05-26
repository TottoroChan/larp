import { Injectable } from '@angular/core';
import { SymptomsService } from './symptoms.service';
import { MedicineService } from './medicine.service';

@Injectable({
  providedIn: 'root',
})
export class PathologicService {
  constructor(
    private symptomsService: SymptomsService,
   private  medicineService: MedicineService
  ) {}

  calculate() {
    const symptoms = this.symptomsService.getSymptoms();
    const medicine = this.medicineService.getMeds();
  }
}
