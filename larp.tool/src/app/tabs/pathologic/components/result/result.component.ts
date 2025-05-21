import { Component, ViewEncapsulation } from '@angular/core';
import { PathologicService } from '@app/tabs/pathologic/services/pathologic.service';
import { allowedSymptomsMask } from '@app/tabs/pathologic/utils/utils';
import { SymptomTable } from '../../models/symptom.model';
import { combineLatest } from 'rxjs';
import { CalculationResult } from '../../models/calculation-result.model';
import { Location } from '@angular/common';

@Component({
  selector: 'app-pathologic-preview',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ResultComponent {
  calculationResult: CalculationResult;

  constructor(private location: Location) {
    this.calculationResult = this.location.getState() as CalculationResult;
  }

  ngOnInit(): void {}
}
