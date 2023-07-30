import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { FilesService } from '../../shared/services/files.service';
import { Octokit } from '@octokit/rest';
import { ToolbarComponent } from './components/toolbar/toolbar.component';

@NgModule({
  imports: [IonicModule, CommonModule, FormsModule, HomePageRoutingModule],
  declarations: [HomePage, ToolbarComponent],
  providers: [FilesService, Octokit],
})
export class HomePageModule {}
