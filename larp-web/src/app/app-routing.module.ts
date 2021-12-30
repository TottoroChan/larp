import { ResourceModule } from './modules/resource/resource.module';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CharacterModule } from './modules/character/character.module';
import { UserModule } from './modules/user/user.module';

const routes: Routes = [
  { path: '', redirectTo: 'users', pathMatch: 'full' },
  { path: 'users', loadChildren: () => UserModule },
  { path: 'characters', loadChildren: () => CharacterModule },
  { path: 'resources', loadChildren: () => ResourceModule },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
