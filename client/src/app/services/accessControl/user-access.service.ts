import { Injectable, inject } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { selectAccessLevel, selectIsAuthenticated} from '@app/_store/_auth-store/auth.selectors';
import { ACCESS_LEVEL_ADMIN, ACCESS_LEVEL_TECH, ACCESS_LEVEL_USER } from '@app/utils/constants';
import { AppState } from '@app/_store/app.state';


@Injectable({
  providedIn: 'root'
})
export class UserAccessService {

  userAccessLevel$!: Observable<string | null>;
  isAuthenticated$: Observable<boolean> = of(false)

  ADMIN_ACCESS = ACCESS_LEVEL_ADMIN;
  USER_ACCESS = ACCESS_LEVEL_USER;
  TECH_ACCESS = ACCESS_LEVEL_TECH;

  constructor(private store: Store<AppState>) {
    this.isAuthenticated$ = this.store.pipe(select(selectIsAuthenticated))
    this.userAccessLevel$ = this.store.pipe(select(selectAccessLevel))
  }
}
