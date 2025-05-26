import { Component, ViewEncapsulation } from '@angular/core';
import { PathologicService } from '@app/tabs/pathologic/services/pathologic.service';
import { allowedSymptomsMask } from '@app/tabs/pathologic/utils/utils';
import { SymptomTable } from '@app/tabs/pathologic/models/symptom-table.model';
import { Medicine, MedicineList } from '@app/tabs/pathologic/models/medicine-list.model';
import { combineLatest } from 'rxjs';
import { MedicineService } from '../../services/medicine.service';
import { SymptomsService } from '../../services/symptoms.service';

@Component({
  selector: 'app-pathologic-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PreviewComponent {
  symptomsTable: SymptomTable[];
  medsList: Medicine[] = null;
  allowedSymptomsMask = allowedSymptomsMask;

  firstRow = () => this.symptomsTable.filter((x) => x.isLast);
  secondRow = () => this.symptomsTable.filter((x) => !x.isLast);

  constructor(
    private symptomsService: SymptomsService,
    private medicineService: MedicineService
  ) {}

  ngOnInit(): void {
    combineLatest([
      this.medicineService.getMeds(),
      this.symptomsService.getSymptoms(),
    ]).subscribe(([meds, symptoms]) => {
      this.medsList = meds;
      this.symptomsTable = symptoms;
    });
  }
}
