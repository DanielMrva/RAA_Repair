import { Component, OnInit } from '@angular/core';
import { AuthService } from '@app/services/auth/auth.service';
import { ACCESS_LEVEL_ADMIN, ACCESS_LEVEL_TECH, ACCESS_LEVEL_USER } from '@app/utils/constants';
import { Store } from '@ngrx/store';
import { AppState } from '@app/_store/app.state';
import { logoutUser } from '@app/_store/_user-store/user.actions';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  loggedUser$

  ADMIN_ACCESS = ACCESS_LEVEL_ADMIN;
  USER_ACCESS = ACCESS_LEVEL_USER;
  TECH_ACCESS = ACCESS_LEVEL_TECH;

  constructor(
    private authService: AuthService,
    private store: Store<AppState>,
    private router: Router
  ) {
    this.loggedUser$ = this.authService.loggedUser$;
  }

  ngOnInit(): void {

  }

  logout() {
    this.authService.logout();
    this.store.dispatch(logoutUser());
    this.router.navigate(['/'])
  }

}
