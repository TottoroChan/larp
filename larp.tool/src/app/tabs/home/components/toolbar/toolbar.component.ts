import { environment } from 'src/environments/environment';
import { FilesService } from '../../../../shared/services/files.service';
import {
  Component,
  ViewEncapsulation,
  OnInit,
  Input,
  EventEmitter,
  Output,
} from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Config } from 'src/app/shared/models/config.model';

@Component({
  selector: 'app-home-toolbar',
  templateUrl: 'toolbar.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class ToolbarComponent implements OnInit {
  @Input() config: Config;
  @Input() isDataLoading: boolean;
  @Input() syncRequired: boolean;
  @Output() syncData = new EventEmitter();

  constructor(
    private filesService: FilesService,
    private alertController: AlertController
  ) {}

  async ngOnInit() {}

  async onSwitchMode() {
    if (!this.config.isMaster) {
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: 'Включить режим мастера.',
        message: 'Введите код:',
        inputs: [
          {
            name: 'code',
            placeholder: 'код',
          },
        ],
        buttons: [
          {
            text: 'Отменить',
            role: 'cancel',
            cssClass: 'secondary',
            id: 'cancel-button',
          },
          {
            text: 'Подтвердить',
            id: 'confirm-button',
            handler: (data) => {
              if (data.code == environment.masterCode) {
                this.switchMode();
              }
            },
          },
        ],
      });

      await alert.present();
    } else {
      this.switchMode();
    }
  }

  private switchMode() {
    this.config.isMaster = !this.config.isMaster;

    this.filesService.writeConfig(this.config).then(async () => {
      this.config = await this.filesService.readConfig();
    });
  }

  onSyncData() {
    this.syncData.emit();
  }
}
