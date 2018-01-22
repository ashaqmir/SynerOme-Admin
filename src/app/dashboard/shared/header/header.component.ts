import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/auth.service';
import { AppStateService } from '../../../core/app-state.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  user: any;
  private appState: any;
  constructor(appState: AppStateService,
    private auth: AuthService) {
    this.appState = appState;
  }


  ngOnInit() {
    this.user = this.appState.userProfile;
  }

  logout() {
    this.auth.signOut();
  }
}
