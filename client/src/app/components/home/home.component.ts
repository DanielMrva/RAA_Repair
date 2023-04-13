import { Component } from '@angular/core';
import { AuthService } from '@app/services/auth.service';
import { User } from '@app/graphql/schemas';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  loading = false;
  user: User;

  constructor(
    private authService: AuthService
  ) {
    this.user = <User>this.authService.userValue;
  }

}
