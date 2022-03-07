import { environment } from 'src/environments/environment';
import { FilesService } from '../../shared/services/files.service';
import { Component, ViewEncapsulation } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { IConfig } from 'src/app/shared/models/config.model';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HomePage {
  isDataLoading: boolean = false;
  config: IConfig = null;

  constructor(
    private filesService: FilesService,
    private alertController: AlertController
  ) {}

  ionViewDidEnter() {
    try {
      this.filesService.readConfig().then((result) => {
        this.config = result;
      });
    } catch (error) {}
  }

  async onSwitchMode() {
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
          handler: (data) => this.switchMode(data),
        },
      ],
    });

    await alert.present();
  }

  private switchMode(data: any) {
    if (data.code.toLowerCase() == environment.masterCode.toLowerCase()) {
      this.config.isMaster = !this.config.isMaster;

      this.filesService.writeConfig(this.config).then(async () => {
        this.config = await this.filesService.readConfig();
      });
    }
  }

  async syncData() {
    this.isDataLoading = true;
    await this.filesService.syncGitData();
    this.isDataLoading = false;
  }
}
