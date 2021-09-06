import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameModule } from './modules/game/game.module';

const routes: Routes = [
  { path: '', redirectTo: 'games', pathMatch: 'full' },
  { path: 'games', loadChildren: () => GameModule },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
