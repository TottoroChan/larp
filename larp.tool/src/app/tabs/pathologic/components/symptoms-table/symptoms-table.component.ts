import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { PathologicService } from '@app/tabs/pathologic/services/pathologic.service';
import { allowedSymptomsMask } from '@app/tabs/pathologic/utils/utils';
import { SymptomTable } from '../../models/symptom.model';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, map } from 'rxjs';

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

  constructor(
    private pathologicService: PathologicService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    combineLatest([
      this.route.data,
      this.pathologicService.getSymptoms(),
    ]).subscribe(([data, symptoms]) => {
      this.symptomsTable = symptoms;
    });
  }
}
