import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { Disease } from '../../models/disease.model';

@Component({
  selector: 'master-result',
  templateUrl: './master-result.component.html',
  styleUrls: ['./master-result.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class MasterResultComponent implements OnInit {
  @Input() realDisiase: Disease;

  constructor() {}

  ngOnInit() {}
}
