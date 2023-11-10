import { Component, OnInit } from '@angular/core';
import { AuthService } from '@app/services/auth/auth.service';
import { ACCESS_LEVEL_ADMIN, ACCESS_LEVEL_TECH, ACCESS_LEVEL_USER } from '@app/utils/constants';
import { Store } from '@ngrx/store';
import { AppState } from '@app/_store/app.state';
import { selectAccessLevel, selectIsAuthenticated } from '@app/_store/_auth-store/auth.selectors';
import { logoutUser } from '@app/_store/_user-store/user.actions';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  loggedUser$ = this.authService.loggedUser$;

  userAccessLevel: string | null = null;

  accessLevel$ = this.store.select(selectAccessLevel);
  isAuthenticated$ = this.store.select(selectIsAuthenticated)

  
  ADMIN_ACCESS = ACCESS_LEVEL_ADMIN;
  USER_ACCESS = ACCESS_LEVEL_USER;
  TECH_ACCESS = ACCESS_LEVEL_TECH;

  constructor(
    private authService: AuthService,
    private store: Store<AppState>
    ) {}

  ngOnInit(): void {

      // this.store.dispatch(autoLogin())
      // this.userAccessLevel = this.authService.getUserAccessLevel();

      this.accessLevel$.subscribe(( accessLevel: string | null) => {
        if(accessLevel) {
          this.userAccessLevel = accessLevel
        } else {
          this.userAccessLevel = null;
        }
      });
  }

  logout() {
    this.authService.logout();
    this.store.dispatch(logoutUser())
  }

}
