import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { RR_AUTH_TOKEN, RR_USER_ID, RR_USER_AL, RR_USER_ORG } from '../constants';
import { User } from '@app/graphql/schemas';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userId: string = '';
  private localUser: string | null = localStorage.getItem('user')
  private userSubject: BehaviorSubject<User | null>;
  private _isAuthenticated = new BehaviorSubject(false);
  public user: Observable<User | null>;


  constructor()
  { 
    // if(this.localUser) {
    //   this.userSubject = new BehaviorSubject(JSON.parse(this.localUser));
    //   this.user = this.userSubject.asObservable();
    // } else {
    // }
    this.userSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('user')!));
    this.user = this.userSubject.asObservable();

  }

  public get userValue() {
    return this.userSubject.value;
  }

  public get isAuthenticated(): Observable<boolean> {
    return this._isAuthenticated.asObservable();
  }

  saveUserData(user: User) {
    console.log(user)
    const userString = JSON.stringify(user)
    localStorage.setItem('user', userString)
    // this.setUserId(user._id);
  }

  setUserId(id: string) {
    this.userId = id;
    this._isAuthenticated.next(true);
  }

  logout() {
    localStorage.removeItem('user');
    this.userId = '';
    this._isAuthenticated.next(false);
  }

  // autoLogin() {
  //   const id = localStorage.getItem(RR_USER_ID);

  //   if (id && id.length > 0) {
  //     this.setUserId(id);
  //   }
  // }

}
