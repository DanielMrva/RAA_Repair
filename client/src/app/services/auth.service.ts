import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User} from '@app/graphql/schemas';


@Injectable({
  providedIn: 'root'
})
export class AuthService {



  loggedUser$ = new BehaviorSubject <
    User | null | undefined
  >(undefined);

  autoLogin() {
    if (localStorage.getItem('user')) {
      const localUser = JSON.parse(localStorage.getItem('user') ?? '');
      this.loggedUser$.next(
          {
            _id: localUser._id, 
            username: localUser.username,
            email: localUser.email,
            password: localUser.password,
            accessLevel: localUser.accessLevel,
            orgName: localUser.orgName
            
          }
        )
    }
  }


  saveUserData(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
    this.loggedUser$.next(user);
  }

  saveUserToken(auth: String) {
    localStorage.setItem('token', JSON.stringify(auth));
  }

  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.loggedUser$.next(null);
    
  }
  constructor () {

  }

}



// private userId: string = '';
// private localUser: string | null = localStorage.getItem('user')
// private userSubject: BehaviorSubject<User | null>;
// // private _isAuthenticated = new BehaviorSubject(false);
// public user: Observable<User | null>;


// constructor( public jwtHelper: JwtHelperService)
// { 

//   this.userSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('user')!));
//   this.user = this.userSubject.asObservable();

// }

// public get userValue() {
//   return this.userSubject.value;
// }

// // public get isAuthenticated(): Observable<boolean> {

// //   return this._isAuthenticated.asObservable();

// // }

// public get isAuthenticated(): boolean {
//   const token = localStorage.getItem('token');

//   return !this.jwtHelper.isTokenExpired(token);
// }

// saveUserToken(auth: string) {
//   console.log(auth)
//   const authString = JSON.stringify(auth);
//   localStorage.setItem('token', authString);
// }

// saveUserData(user: User) {
//   console.log(user)
//   const userString = JSON.stringify(user);
//   localStorage.setItem('user', userString);
// }

// // setUserId(id: string) {
// //   this.userId = id;
// //   this._isAuthenticated.next(true);
// // }

// logout() {
//   localStorage.removeItem('user');
//   localStorage.removeItem('token');
//   this.userId = '';
//   // this._isAuthenticated.next(false);
// }
