import { Component, ViewEncapsulation } from '@angular/core';
import { getWizardTitle } from '@app/tabs/pathologic/utils/utils';
import { PathologicService } from '@app/tabs/pathologic/services/pathologic.service';
import { SymptomTable } from '@app/tabs/pathologic/models/symptom-table.model';
import { ActivatedRoute, Router } from '@angular/router';
import { SymptomsService } from './services/symptoms.service';
import { CalculationResult } from './models/calculation-result.model';
import { BehaviorSubject, first, Observable, pipe } from 'rxjs';

@Component({
  selector: 'app-pathologic',
  templateUrl: 'pathologic.page.html',
  styleUrls: ['pathologic.page.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PathologicPageComponent {
  canProceed: boolean;
  getTitle = getWizardTitle;

  currentStep = 1;
  private stepChanges$ = new BehaviorSubject<number>(this.currentStep);

  constructor(
    private pathologicService: PathologicService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.stepChanges$.subscribe((step) => {
      this.pathologicService.canProceed(step).subscribe((can) => {
        this.canProceed = can;
      });
    });
  }

  goToStart() {
    this.pathologicService.cleanUp();
    this.currentStep = 1;
    this.stepChanges$.next(this.currentStep);
    this.router.navigate([`./step${this.currentStep}`], {
      relativeTo: this.activatedRoute,
    });
  }

  nextStep() {
    if (this.currentStep == 1) {
      var result = this.pathologicService.checkSymptomsTable();

      if (result.result != '') {
        this.navigateToResult(result);
        return;
      }
    }

    this.currentStep++;
    this.stepChanges$.next(this.currentStep);
    this.router.navigate([`./step${this.currentStep}`], {
      relativeTo: this.activatedRoute,
    });
  }

  private navigateToResult(result: CalculationResult) {
    this.currentStep = 0;
    this.stepChanges$.next(this.currentStep);
    this.router.navigate([`./result`], {
      relativeTo: this.activatedRoute,
      state: result,
    });
  }

  prevStep() {
    this.currentStep--;
    this.stepChanges$.next(this.currentStep);
    this.router.navigate([`./step${this.currentStep}`], {
      relativeTo: this.activatedRoute,
    });
  }

  calculate() {
    this.pathologicService
      .calculate()
      .pipe(first())
      .subscribe((result) => this.navigateToResult(result));
  }
}
