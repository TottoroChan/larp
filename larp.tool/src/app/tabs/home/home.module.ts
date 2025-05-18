import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HomePage } from '@app/tabs/home/home.page';

import { HomePageRoutingModule } from '@app/tabs/home/home-routing.module';
import { FilesService } from '../../shared/services/files.service';
import { Octokit } from '@octokit/rest';
import { ToolbarComponent } from '@app/tabs/home/components/toolbar/toolbar.component';

@NgModule({
  imports: [IonicModule, CommonModule, FormsModule, HomePageRoutingModule],
  declarations: [HomePage, ToolbarComponent],
  providers: [FilesService, Octokit],
})
export class HomePageModule {}
