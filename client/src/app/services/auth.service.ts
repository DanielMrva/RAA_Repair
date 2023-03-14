import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { RR_AUTH_TOKEN, RR_USER_ID, RR_USER_AL, RR_USER_ORG } from '../constants';
// import { decode } from 'jsonwebtoken';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userId: string = '';
  private _isAuthenticated = new BehaviorSubject(false);

  constructor() { 

  }

  get isAuthenticated(): Observable<boolean> {
    return this._isAuthenticated.asObservable();
  }

  saveUserData(id: string, org: string, accessLevel: string, token: string) {
    localStorage.setItem(RR_USER_ID, id);
    localStorage.setItem(RR_USER_ORG, org);
    localStorage.setItem(RR_USER_AL, accessLevel);
    localStorage.setItem(RR_AUTH_TOKEN, token);
    this.setUserId(id);
  }

  setUserId(id: string) {
    this.userId = id;
    this._isAuthenticated.next(true);
  }

  logout() {
    localStorage.removeItem(RR_USER_ID);
    localStorage.removeItem(RR_AUTH_TOKEN);
    localStorage.removeItem(RR_USER_ORG);
    localStorage.removeItem(RR_USER_AL);
    this.userId = '';

    this._isAuthenticated.next(false);
  }

  autoLogin() {
    const id = localStorage.getItem(RR_USER_ID);

    if (id && id.length > 0) {
      this.setUserId(id);
    }
  }

  authDecode() {

  }
}
