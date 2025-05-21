import { Component, ViewEncapsulation } from '@angular/core';
import { PathologicService } from '@app/tabs/pathologic/services/pathologic.service';
import { allowedSymptomsMask } from '@app/tabs/pathologic/utils/utils';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pathologic-medicine',
  templateUrl: './medicine.component.html',
  styleUrls: ['./medicine.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class MedicineComponent {
  medsList: string[] = null;
  newMed: string;
  allowedSymptomsMask = allowedSymptomsMask;

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
    this.pathologicService.addMed(this.newMed.trim());
  }

  onDeleteSymptom(index: number) {
    this.pathologicService.removeSymptom(index);
  }

  onDeleteMed(index: number) {
    this.pathologicService.removeMed(index);
  }
}
