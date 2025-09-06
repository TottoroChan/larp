import { Component, ViewEncapsulation } from '@angular/core';
import { CalculationResult } from '../../models/calculation-result.model';
import { Location } from '@angular/common';
import { PATHOLOGIC_DEBUG_MODE } from '../../utils/utils';

@Component({
  selector: 'app-pathologic-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ResultComponent {
  calculationResult: CalculationResult = null;

  isDebugMode = PATHOLOGIC_DEBUG_MODE;

  constructor(private location: Location) {
    this.calculationResult = this.location.getState() as CalculationResult;
  }

  ngOnInit(): void {}
}
