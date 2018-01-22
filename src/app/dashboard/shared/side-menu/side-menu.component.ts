import { Component, OnInit } from '@angular/core';
import { AppStateService } from '../../../core/app-state.service';
import menuItems from './menu-items';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css']
})
export class SideMenuComponent implements OnInit {

  user: any;
  menus: any[];
  private appState: any;
  constructor(appState: AppStateService) {
    this.appState = appState;
  }

  ngOnInit() {
    this.user = this.appState.userProfile;
    this.menus = menuItems;
    console.log(this.menus);
  }
  activateMe(cap) {
    const mitem = this.menus.find(m => m.caption === cap);
    if (mitem) {
      console.log(mitem);
      mitem.isActive = true;
    }
  }
}
