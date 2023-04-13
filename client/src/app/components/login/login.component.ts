import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router, ActivatedRoute} from '@angular/router';
import { ADD_USER, LOGIN_USER } from 'src/app/graphql/schemas';
import { Apollo } from 'apollo-angular';
import { RR_AUTH_TOKEN, RR_USER_ID, RR_USER_AL, RR_USER_ORG } from 'src/app/constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  login: boolean = true;
  email: string = '';
  password: string = '';
  username: string = '';
  orgName: string = '';

  constructor(
              private authService: AuthService,
              private router: Router,
              private apollo: Apollo
              ) { }

  ngOnInit(): void {
      
  }

  confirm() {

    if (this.login) {
      this.apollo.mutate<any>({
        mutation: LOGIN_USER,
        variables: {
          email: this.email,
          password: this.password
        }
      }) .subscribe({next: (result) => {
        const id = result.data.login.user._id;
        const org = result.data.login.user.orgName
        const accessLevel = result.data.login.user.accessLevel
        const token = result.data.login.token;
        this.saveUserData(id, org, accessLevel, token);

        this.router.navigate(['/']);
      }, error: (error) => {
        alert(error)
      }});
    } else {
      this.apollo.mutate<any> ({
        mutation: ADD_USER,
        variables: {
          username: this.username,
          email: this.email,
          orgName: this.orgName,
        }
      }) .subscribe({next: (result) => {
        const id = result.data.addUser.user._id;
        const org = result.data.login.user.orgName
        const accessLevel = result.data.login.user.accessLevel

        const token = result.data.addUser.token;

        this.saveUserData(id, org, accessLevel, token);

        this.router.navigate(['/']);
      }, error: (error) => {
        alert(error)
      }});
    }

  }

  saveUserData(id: any, org: string, accessLevel: string, token: any) {
    localStorage.setItem(RR_USER_ID, id);
    localStorage.setItem(RR_AUTH_TOKEN, token);
    localStorage.setItem(RR_USER_ORG, org);
    localStorage.setItem(RR_USER_AL, accessLevel);
    this.authService.setUserId(id);
  }

}
