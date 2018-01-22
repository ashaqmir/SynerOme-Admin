import { Injectable } from '@angular/core';

@Injectable()
export class AppStateService {

  userProfile: IProfile;

  constructor() { }

  clearState() {
    this.userProfile = null;
  }
}
