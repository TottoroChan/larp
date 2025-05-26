import { Component, ViewEncapsulation } from '@angular/core';
import { PathologicService } from '@app/tabs/pathologic/services/pathologic.service';
import { ALLOWED_MEDS } from '@app/tabs/pathologic/utils/utils';
import { Medicine } from '@app/tabs/pathologic/models/meds-list.model';
import { MedicineService } from '../../services/medicine.service';
import { ToastController } from '@ionic/angular';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-pathologic-medicine',
  templateUrl: './medicine.component.html',
  styleUrls: ['./medicine.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class MedicineComponent {
  medsList: Medicine[] = [];
  immuneLimit: number;
  antibLimit: number;

  allowedMeds = ALLOWED_MEDS;
  medPartFirst = '';
  medPartSecond = '';

  antibioticsCount = () =>
    this.medsList.filter((x) => x.type == 'антибиотик').length;
  antisepticsCount = () =>
    this.medsList.filter((x) => x.type == 'антисептик').length;
  painkillerCount = () =>
    this.medsList.filter((x) => x.type == 'обезболивающее').length;

  get immunesCount(): number {
    return this.medsList.filter((x) => x.type == 'иммуник').length;
  }

  constructor(
    private pathologicService: PathologicService,
    private medicineService: MedicineService,
    private toastController: ToastController
  ) {}

  ngOnInit(): void {
    combineLatest([
      this.medicineService.getMeds(),
      this.medicineService.getImmunesLimits(),
      this.medicineService.getAntibioticsLimits(),
    ]).subscribe(([meds, immuneLimit, antibLimit]) => {
      this.medsList = meds;
      this.immuneLimit = immuneLimit;
      this.antibLimit = antibLimit;
    });
  }

  onAddMed() {
    const medicine = this.medicineService.identifyMedicine(
      this.medPartFirst,
      this.medPartSecond
    );

    if (!medicine) {
      this.presentToast('Такой комбинации ингредиентов не существует');
    } else {
      const result = this.medicineService.checkLimits(medicine);
      if (result) {
        this.presentToast(result)
      } else {
        this.medicineService.addMedicine(medicine);
      }
    }

    this.medPartFirst = '';
    this.medPartSecond = '';
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 1500,
      position: 'middle',
      color: 'danger',
    });

    await toast.present();
  }

  onDeleteSymptom(index: number) {
    this.pathologicService.removeSymptom(index);
  }

  onDeleteMed(index: number) {
    this.medicineService.removeMed(index);
  }
}
