import { Component, OnInit } from '@angular/core';
import { appSettings } from '@app/app.config';
import { Tab } from '@app/shared/models/tab.models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
})
export class TabsPageComponent implements OnInit {
  tabs: Tab[] = appSettings.tabs;

  constructor(private router: Router) {}

  ngOnInit(): void {
    const defaultTab = this.tabs.find((tab) => tab.isDefault === true);
    this.router.navigate([`tabs/${defaultTab.route}`]);
  }
}
