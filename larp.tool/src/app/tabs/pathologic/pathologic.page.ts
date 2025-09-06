import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import {
  getWizardTitle,
  WITH_FIREBASE,
} from '@app/tabs/pathologic/utils/utils';
import { PathologicService } from '@app/tabs/pathologic/services/pathologic.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CalculationResult } from './models/calculation-result.model';
import { BehaviorSubject, first } from 'rxjs';
import { IonModal, ModalController } from '@ionic/angular';
import { ModalComponent } from './components/modal/modal.component';

@Component({
  selector: 'app-pathologic',
  templateUrl: 'pathologic.page.html',
  styleUrls: ['pathologic.page.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PathologicPageComponent {
  canProceed: boolean;
  getTitle = getWizardTitle;
  isWithFirebase = WITH_FIREBASE;

  @ViewChild(IonModal) modal!: IonModal;

  currentStep = 1;
  private stepChanges$ = new BehaviorSubject<number>(this.currentStep);

  constructor(
    private pathologicService: PathologicService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private modalCtrl: ModalController
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

  cancelModal(data: any) {
    this.modal.dismiss(null, 'cancel');
  }

  async openModal() {
    const modal = await this.modalCtrl.create({
      component: ModalComponent,
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      const message = `Hello, ${data}!`;
    }
  }
}
