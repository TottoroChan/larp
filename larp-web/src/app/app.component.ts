import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'larp-web';
  visibleSidebar = false;

  ngOnInit() {
  } 

  toggleSideBar(){
      this.visibleSidebar = !this.visibleSidebar;
  }
}
