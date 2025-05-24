import { Component, ViewEncapsulation } from '@angular/core';
import { PathologicService } from '@app/tabs/pathologic/services/pathologic.service';
import { allowedSymptomsMask } from '@app/tabs/pathologic/utils/utils';
import { SymptomTable } from '../../models/symptom-table.model';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-pathologic-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PreviewComponent {
  symptomsTable: SymptomTable[];
  meds: string[] = null;
  allowedSymptomsMask = allowedSymptomsMask;

  firstRow = () => this.symptomsTable.filter((x) => x.isLast);
  secondRow = () => this.symptomsTable.filter((x) => !x.isLast);

  constructor(
    private pathologicService: PathologicService
  ) {}

  ngOnInit(): void {
    combineLatest([
      this.pathologicService.getMeds(),
      this.pathologicService.getSymptoms(),
    ]).subscribe(([meds, symptoms]) => {
      this.meds = meds;
      this.symptomsTable = symptoms;
    });
  }
}
