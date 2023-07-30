import { Component } from '@angular/core';
import { appSettings } from '../app.config';
import { Tab } from '../shared/models/tab.models';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
})
export class TabsPage {
  tabs: Tab[] = appSettings.tabs;

  constructor() {}
}
