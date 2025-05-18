import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from '@app/tabs/tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('@app/tabs/home/home.module').then(m => m.HomePageModule)
      },
      {
        path: 'rules',
        loadChildren: () => import('@app/tabs/rules/rules.module').then(m => m.RulesPageModule)
      },
      {
        path: 'tools',
        loadChildren: () => import('@app/tabs/tools/tools.module').then(m => m.ToolsPageModule)
      },
      {
        path: 'pathologic',
        loadChildren: () => import('@app/tabs/pathologic/pathologic.module').then(m => m.PathologicPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
