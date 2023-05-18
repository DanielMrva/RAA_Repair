import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { ADD_USER, LOGIN_USER } from 'src/app/graphql/schemas';
import { Apollo } from 'apollo-angular';
import { AuthService } from '@app/services/auth.service';

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

        console.log(result);
        this.authService.saveUserData(result.data.login.user)

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
        // const id = result.data.addUser.user._id;
        // const org = result.data.login.user.orgName
        // const accessLevel = result.data.login.user.accessLevel
;
        this.authService.saveUserData(result.data.login.user);
        this.authService.saveUserToken(result.data.login.token);

        this.router.navigate(['/']);
      }, error: (error) => {
        alert(error)
      }});
    }

  }


}
