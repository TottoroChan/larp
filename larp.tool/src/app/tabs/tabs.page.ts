import { Component, OnInit } from '@angular/core';
import { appSettings } from '../app.config';
import { Tab } from '../shared/models/tab.models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
})
export class TabsPage implements OnInit {
  tabs: Tab[] = appSettings.tabs;

  constructor(private router: Router) {}

  ngOnInit(): void {
    const defaultTab = this.tabs.find((tab) => tab.isDefault === true);
    this.router.navigate([`tabs/${defaultTab.id}`]);
  }
}
