import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

import { Observable } from 'rxjs/Observable';
import { switchMap } from 'rxjs/operators';
import { AppStateService } from './app-state.service';

@Injectable()
export class AuthService {

  user: Observable<IProfile | null>;
  private appState: any;

  constructor(private router: Router,
    private afAuth: AngularFireAuth,
    private afDb: AngularFireDatabase,
    appState: AppStateService) {
    this.appState = appState;

    this.user = this.afAuth.authState
      .switchMap((user) => {
        if (user) {
          // return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
          return this.getUserProfile(user.uid);
        } else {
          return Observable.of(null);
        }
      });
  }

  emailLogin(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then((user) => {
        return this.getUserProfile(user.uid).then(profile => {
          if (profile.isAdmin) {
            return profile;
          } else {
            this.signOut();
            return null;
          }
        }).catch(error => {
          this.handleError(error);
          return null;
        });
      })
      .catch((error) => this.handleError(error));
  }

  // If error, console log and notify user
  private handleError(error: Error) {
    console.error(error);
    // this.notify.update(error.message, 'error');
  }
  getUserProfile(uid): Promise<IProfile> {
    return new Promise(resolve => {
      const profRef = this.afDb.object('/profiles/' + uid);
      profRef.snapshotChanges().subscribe(profData => {
        const userProfile = profData.payload.val();
        if (userProfile) {
          this.appState.userProfile = userProfile;
          resolve(userProfile);
        }
      });
    });
  }
  signOut() {
    this.afAuth.auth.signOut().then(() => {
      this.appState.clearState();
      this.router.navigate(['/']);
    });
  }
}
