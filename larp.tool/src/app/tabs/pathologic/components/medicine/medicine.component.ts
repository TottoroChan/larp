import { Component, ViewEncapsulation } from '@angular/core';
import { PathologicService } from '@app/tabs/pathologic/services/pathologic.service';
import {
  ALLOWED_MEDS,
  allowedSymptomsMask,
  antibioticCombinations,
  antisepticCombinations,
  immuneCombinations,
  painkillerCombinations,
} from '@app/tabs/pathologic/utils/utils';
import { ActivatedRoute } from '@angular/router';
import { MedsList } from '../../models/meds-list.model';
import { CombinationItem } from '../../models/combination-item.model';

@Component({
  selector: 'app-pathologic-medicine',
  templateUrl: './medicine.component.html',
  styleUrls: ['./medicine.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class MedicineComponent {
  medsList: MedsList = null;
  allowedSymptomsMask = allowedSymptomsMask;
  allowedMeds = ALLOWED_MEDS;
  medPartFirst = '';
  medPartSecond = '';

  constructor(
    private pathologicService: PathologicService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.pathologicService.getMeds().subscribe((meds) => {
      this.medsList = meds;
    });
  }

  onAddMed() {
    this.pathologicService.addMed(`${this.medPartFirst}${this.medPartSecond}`);

    this.medPartFirst = '';
    this.medPartSecond = '';
  }

  onDeleteSymptom(index: number) {
    this.pathologicService.removeSymptom(index);
  }

  onDeleteMed(index: number) {
    this.pathologicService.removeMed(index);
  }
}
