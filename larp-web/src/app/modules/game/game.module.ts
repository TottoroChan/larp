import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameComponent } from './game.component';
import { RouterModule, Routes } from '@angular/router';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';

import { GameService } from 'src/app/shared/services/game.service';

const appRoutes: Routes = [{ path: '', component: GameComponent }];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(appRoutes), TableModule, InputTextModule],
  declarations: [GameComponent],
  providers: [GameService],
})
export class GameModule {}
