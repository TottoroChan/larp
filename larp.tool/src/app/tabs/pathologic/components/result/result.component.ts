import { Component, ViewEncapsulation } from '@angular/core';
import { CalculationResult } from '../../models/calculation-result.model';
import { Location } from '@angular/common';

@Component({
  selector: 'app-pathologic-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ResultComponent {
  calculationResult: CalculationResult = null;

  constructor(private location: Location) {
    this.calculationResult = this.location.getState() as CalculationResult;
  }

  ngOnInit(): void {}
}
