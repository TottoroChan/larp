import { Component, ViewEncapsulation } from '@angular/core';
import { getWizardTitle } from '@app/tabs/pathologic/utils/utils';
import { PathologicService } from '@app/tabs/pathologic/services/pathologic.service';
import { SymptomTable } from '@app/tabs/pathologic/models/symptom.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-pathologic',
  templateUrl: 'pathologic.page.html',
  styleUrls: ['pathologic.page.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PathologicPageComponent {
  getTitle = getWizardTitle;

  currentStep = 1;

  constructor(
    private pathologicService: PathologicService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  goToStart() {
    this.currentStep = 1;
    this.router.navigate([`./step${this.currentStep}`], {
      relativeTo: this.activatedRoute,
    });
  }

  nextStep() {
    var result = this.pathologicService.validateStep(this.currentStep);

    if (result.result == '' && !result.isCalculated) {
      this.currentStep++;
      this.router.navigate([`./step${this.currentStep}`], {
        relativeTo: this.activatedRoute,
      });
    } else {
      this.currentStep = 0;
      this.router.navigate([`./result`], {
        relativeTo: this.activatedRoute,
        state: result,
      });
    }
  }

  prevStep() {
    this.currentStep--;
    this.router.navigate([`./step${this.currentStep}`], {
      relativeTo: this.activatedRoute,
    });
  }

  calculate() {
    this.pathologicService.calculate();
  }
}
