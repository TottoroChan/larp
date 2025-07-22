import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {
  ALLOWED_SYMPTOMS,
  allowedSymptomsMask,
} from '@app/tabs/pathologic/utils/utils';
import { SymptomTable } from '@app/tabs/pathologic/models/symptom-table.model';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, map } from 'rxjs';
import { SymptomsService } from '../../services/symptoms.service';

@Component({
  selector: 'app-pathologic-symptoms-table',
  templateUrl: './symptoms-table.component.html',
  styleUrls: ['./symptoms-table.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SymptomsTableComponent implements OnInit {
  symptomsTable: SymptomTable[] = null;
  allowedSymptomsMask = allowedSymptomsMask;

  firstLayer = () => this.symptomsTable.filter((x) => x.layer == 1);
  secondLayer = () => this.symptomsTable.filter((x) => x.layer == 2);
  thirdLayer = () => this.symptomsTable.filter((x) => x.layer == 3);

  allowedSymptoms = ALLOWED_SYMPTOMS;

  customActionSheetOptions = {
    header: 'Выберите симптом:',
    cssClass: 'custom-selector'
  };

  constructor(
    private symptomsService: SymptomsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    combineLatest([
      this.route.data,
      this.symptomsService.getSymptoms(),
    ]).subscribe(([data, symptoms]) => {
      this.symptomsTable = symptoms;
    });
  }

  onValueChange() {
    const hasValues = this.symptomsTable.some(x => x.value != ALLOWED_SYMPTOMS[0]);
    this.symptomsService.canProceed(hasValues);
  }

  getTextInParentheses(input: string): string | null {
    const regex = /\(([^)]+)\)/;
    const match = input.match(regex);
    return match ? match[1] : null;
  }
}
