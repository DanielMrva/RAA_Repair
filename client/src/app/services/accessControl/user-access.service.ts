import { Injectable, inject } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { selectAccessLevel, selectIsAuthenticated} from '@app/_store/_auth-store/auth.selectors';
import { ACCESS_LEVEL_ADMIN, ACCESS_LEVEL_TECH, ACCESS_LEVEL_USER, AccessLevel } from '@app/utils/constants';
import { AppState } from '@app/_store/app.state';


@Injectable({
  providedIn: 'root'
})
export class UserAccessService {

  private userAccessSubject = new BehaviorSubject<AccessLevel | null>(null);
  userAccessLevel$ = this.userAccessSubject.asObservable();
  isAuthenticated$: Observable<boolean> = of(false);

  ADMIN_ACCESS = ACCESS_LEVEL_ADMIN;
  USER_ACCESS = ACCESS_LEVEL_USER;
  TECH_ACCESS = ACCESS_LEVEL_TECH;

  constructor(private store: Store<AppState>) {
    this.isAuthenticated$ = this.store.pipe(select(selectIsAuthenticated));

    this.store.pipe(select(selectAccessLevel)).subscribe(this.userAccessSubject);
  }

  hasLevel(required: AccessLevel | AccessLevel[]): boolean {
    const current = this.userAccessSubject.value
    if (!current) return false;

    return Array.isArray(required) ? required.includes(current) : required === current;
  }
}
