import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { ADD_USER, LOGIN_USER } from 'src/app/graphql/schemas';
import { Apollo } from 'apollo-angular';
import { AuthService } from '@app/services/auth.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastService } from '@app/services/toast.service';

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


  constructor(
              private formBuilder: FormBuilder,
              private authService: AuthService,
              private router: Router,
              private apollo: Apollo,
              private toastService: ToastService
              ) { }

  ngOnInit(): void {
      
  }

  onSubmit() {

    if (this.login) {
      this.apollo.mutate<any>({
        mutation: LOGIN_USER,
        variables: {
          email: this.loginForm.value.email,
          password: this.loginForm.value.password
        }
      }) .subscribe({next: (result) => {

        // console.log(result);
        this.authService.saveUserData(result.data.login.user)
        this.authService.saveUserToken(result.data.login.token)

        this.toastService.show(`Welcome ${result.data.login.user.username} !`, {
          classname: 'bg-sucess text-light',
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
          classname: 'bg-sucess text-light',
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
