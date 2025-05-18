import { Router } from '@angular/router';
import { FilesService } from '../../shared/services/files.service';
import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { validateMedicineCode, validateSymptomCode } from '@app/tabs/pathologic/utils/utils';

@Component({
  selector: 'app-pathologic',
  templateUrl: 'pathologic.page.html',
  styleUrls: ['pathologic.page.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PathologicPage implements OnInit {
  form: UntypedFormGroup;

  validateSymptomCode = validateSymptomCode;
  validateMedicineCode = validateMedicineCode;

  constructor(private fb: UntypedFormBuilder) {
    this.form = this.fb.group({
      symptomCode: [
        '',
        [Validators.required, this.validateSymptomCode.bind(this)],
      ],
      medicineCode: [
        '',
        [Validators.required, this.validateMedicineCode.bind(this)],
      ],
    });
  }

  async ngOnInit(): Promise<void> {}

  onSubmit() {
    if (this.form.valid) {
      console.log('Форма отправлена', this.form.value);
    } else {
      console.log('Форма содержит ошибки');
    }
  }
}
