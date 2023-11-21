import { Component } from '@angular/core';
import { AuthService } from '@app/services/auth/auth.service';
import { User } from '@app/graphql/schemas';
import { Store } from '@ngrx/store';
import { AppState } from '@app/_store/app.state';
import { selectIsAuthenticated, selectUserName } from '@app/_store/_auth-store/auth.selectors';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  loading = false;
  // user: User;

  userName$ = this.store.select(selectUserName);
  isAuthenticated$ = this.store.select(selectIsAuthenticated);

  constructor(
    private authService: AuthService,
    private store: Store<AppState>
  ) {
    // this.user = <User>this.authService.loggedUser$.value;
  }

}
