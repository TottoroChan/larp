import { Component, ViewEncapsulation } from '@angular/core';
import { FormControl, UntypedFormGroup, Validators } from '@angular/forms';
import {
  validateMedicineCode,
  validateSymptomCode,
} from '@app/tabs/pathologic/utils/utils';
import { PathologicService } from '@app/tabs/pathologic/services/pathologic.service';
import { Symptom } from '@app/tabs/pathologic/models/symptom.model';

@Component({
  selector: 'app-pathologic',
  templateUrl: 'pathologic.page.html',
  styleUrls: ['pathologic.page.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PathologicPageComponent {
  form: UntypedFormGroup;

  validateSymptomCode = validateSymptomCode;
  validateMedicineCode = validateMedicineCode;

  symptoms: Symptom[] = [];
  meds: string[] = [];

  symptomOneControl = new FormControl('', [
    Validators.required,
    Validators.minLength(1),
    Validators.maxLength(50),
  ]);
  symptomTwoControl = new FormControl('', [
    Validators.required,
    Validators.minLength(1),
    Validators.maxLength(50),
  ]);
  symptomThreeControl = new FormControl('', [
    Validators.required,
    Validators.minLength(1),
    Validators.maxLength(50),
  ]);
  medsControl = new FormControl('', [
    Validators.required,
    Validators.minLength(1),
    Validators.maxLength(50),
  ]);

  layerOneSymptoms = () => this.symptoms.filter((x) => x.layer == 1);
  layerTwoSymptoms = () => this.symptoms.filter((x) => x.layer == 2);
  layerThreeSymptoms = () => this.symptoms.filter((x) => x.layer == 3);

  constructor(private pathologicService: PathologicService) {}

  ionViewWillEnter() {
    this.pathologicService.getSymptoms().subscribe((symptoms) => {
      this.symptoms = symptoms;
    });
    this.pathologicService.getMeds().subscribe((meds) => {
      this.meds = meds;
    });
  }

  onAddSymptom(layer: number) {
    switch (layer) {
      case 1:
        if (this.symptomOneControl.valid) {
          this.pathologicService.addSymptom(
            this.symptomOneControl.value.trim(),
            layer
          );
          this.symptomOneControl.reset();
        }
        break;
      case 2:
        if (this.symptomTwoControl.valid) {
          this.pathologicService.addSymptom(
            this.symptomTwoControl.value.trim(),
            layer
          );
          this.symptomTwoControl.reset();
        }
        break;
      case 3:
        if (this.symptomThreeControl.valid) {
          this.pathologicService.addSymptom(
            this.symptomThreeControl.value.trim(),
            layer
          );
          this.symptomThreeControl.reset();
        }
        break;
      default:
        break;
    }
  }

  onAddMed() {
    if (this.medsControl.valid) {
      this.pathologicService.addMed(this.medsControl.value.trim());
      this.medsControl.reset();
    }
  }

  onDeleteSymptom(index: number) {
    this.pathologicService.removeSymptom(index);
  }

  onDeleteMed(index: number) {
    this.pathologicService.removeMed(index);
  }

  onCalculate() {    
    this.pathologicService.calculate();
  }
}
