import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent {
  title = 'larp-web';
  visibleSidebar = false;
  menuItems!: MenuItem[];
  activeMenuItem!: MenuItem;

  ngOnInit() {
    this.menuItems = [
      { label: 'Home', icon: 'pi pi-fw pi-home', routerLink: '' },
      { label: 'Users', icon: 'pi pi-fw pi-user', routerLink: '/users' },
      {
        label: 'Characters',
        icon: 'pi pi-fw pi-pencil',
        routerLink: '/characters',
      },
      {
        label: 'Resources',
        icon: 'pi pi-fw pi-file',
        routerLink: '/resources',
      },
    ];

    this.activeMenuItem = this.menuItems[0];
  }

  toggleSideBar() {
    this.visibleSidebar = !this.visibleSidebar;
  }
}
