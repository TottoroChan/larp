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

  symptoms: SymptomTable[] = [];
  meds: string[] = [];
  currentStep = 1;

  constructor(
    private pathologicService: PathologicService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  nextStep() {
    this.currentStep++;
    this.router.navigate([`./step${this.currentStep}`], {relativeTo: this.activatedRoute});
  }

  prevStep() {
    this.currentStep--;
    this.router.navigate([`./step${this.currentStep}`], {relativeTo: this.activatedRoute});
  }

  ionViewWillEnter() {
    this.pathologicService.getSymptoms().subscribe((symptoms) => {
      this.symptoms = symptoms;
    });
    this.pathologicService.getMeds().subscribe((meds) => {
      this.meds = meds;
    });
  }
}
