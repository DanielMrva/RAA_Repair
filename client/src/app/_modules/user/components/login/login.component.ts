import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ADD_USER, LOGIN_USER, User } from 'src/app/graphql/schemas';
import { Apollo } from 'apollo-angular';
import { UserService } from '@app/services/users/user.service';
import { AuthService } from '@app/services/auth/auth.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastService } from '@app/services/toast/toast.service';

import { Store } from '@ngrx/store';
import { loginUser, addUser } from '@app/_store/_user-store/user.actions';
import { AppState } from '@app/_store/app.state';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  loginForm = this.formBuilder.group({
    username: '',
    password: '',
    email: '',
    orgName: ''
  })
  login: boolean = true;

  loginUserForm = new FormGroup({
    username: new FormControl<string>(''),
    email: new FormControl<string>('', { nonNullable: true }),
    password: new FormControl<string>('', { nonNullable: true }),
    orgName: new FormControl<string>('')
  })


  constructor(
              private formBuilder: FormBuilder,
              private userService: UserService,
              private authService: AuthService,
              private router: Router,
              private apollo: Apollo,
              private toastService: ToastService,
              private store: Store<AppState>
              ) { }

  ngOnInit(): void {
      
  }

  onLogin() {

    console.log('onLogin clicked')

    const email = this.loginUserForm.value.email ?? '';
    const password = this.loginUserForm.value.password ?? '';

    console.log(`${email}, ${password}`)

    this.store.dispatch(loginUser({email , password}))
  };

  // onNewUser() {
  //   const username = this.loginUserForm.value.username ?? '';
  //   const email = this.loginUserForm.value.email ?? '';
  //   const password = this.loginUserForm.value.password ?? '';

  //   this.store.dispatch(addUser({ email}))
  // }



  onSubmit() {

    if (this.login) {

      this.onLogin();

      // this.apollo.mutate<any>({
      //   mutation: LOGIN_USER,
      //   variables: {
      //     email: this.loginForm.value.email,
      //     password: this.loginForm.value.password
      //   }
      // }) .subscribe({next: (result) => {

      //   this.authService.saveUserData(result.data.login.user);
      //   this.authService.saveUserToken(result.data.login.token);

      //   this.toastService.show(`Welcome ${result.data.login.user.username} !`, {
      //     classname: 'bg-success text-light',
      //     delay: 3000
      //   });

      //   this.router.navigate(['/']);
      // }, error: (error) => {
      //   console.error(error);
      //   this.toastService.show(`${error}`, {
      //     classname: 'bg-danger text-light',
      //     delay: 3000
      //   });

      // }});


    } else {
      this.apollo.mutate<any> ({
        mutation: ADD_USER,
        variables: {
          username: this.loginForm.value.username,
          email: this.loginForm.value.email,
          orgName: this.loginForm.value.orgName,
          password: this.loginForm.value.password
        }
      }) .subscribe({next: (result) => {

        this.authService.saveUserData(result.data.login.user);
        this.authService.saveUserToken(result.data.login.token);

        this.toastService.show(`Welcome ${result.data.login.user.username} !`, {
          classname: 'bg-success text-light',
          delay: 3000
        });

        this.router.navigate(['/']);
      }, error: (error) => {
        console.error(error);
        this.toastService.show(`${error}`, {
          classname: 'bg-danger text-light',
          delay: 3000
        });

      }});
    }

  }


}
