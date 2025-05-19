import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { FilesService } from '@app/shared/services/files.service';
import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Config } from '@app/shared/models/config.model';
import { appSettings } from '@app/app.config';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HomePageComponent implements OnInit {
  isDataLoading = false;
  config: Config = null;
  syncRequired = false;
  lastSyncDate: string;
  appSettings = appSettings;

  constructor(
    private filesService: FilesService,
    private alertController: AlertController,
    private router: Router
  ) {}

  async ngOnInit(): Promise<void> {
    if (appSettings.repo != null) {
      try {
        this.config = await this.filesService.readConfig();
        const lastModifiedDate = await this.filesService.getGitLastModifiedDate(
          null
        );

        if (new Date(this.config.lastSyncDate) < lastModifiedDate) {
          this.lastSyncDate = new Date(
            this.config.lastSyncDate
          ).toLocaleString();
          this.syncRequired = true;
        }
      } catch (error) {}
    }
  }

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
              if (data.code === environment.masterCode) {
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

  switchTab(tabName: string) {
    this.router.navigateByUrl(`tabs/${tabName}`);
  }

  async syncData() {
    this.isDataLoading = true;

    await this.filesService.syncGitData();

    this.config = await this.filesService.readConfig();
    const lastSyncDate = new Date(this.config.lastSyncDate);
    const currentDate = new Date();
    if (lastSyncDate.toDateString() === currentDate.toDateString()) {
      this.syncRequired = false;
    }

    await this.delay(3000);

    this.isDataLoading = false;
  }

  private switchMode() {
    this.config.isMaster = !this.config.isMaster;

    this.filesService.writeConfig(this.config).then(async () => {
      this.config = await this.filesService.readConfig();
    });
  }

  private async delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
