import { Injectable, inject } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { selectIsAuthenticated} from '@app/_store/_auth-store/auth.selectors';
import { AppState } from '@app/_store/app.state';

@Injectable({
  providedIn: 'root'
})
export class UserAuthenticatedService {

  isAuthenticated$: Observable<boolean> = of(false)



  constructor(private store: Store<AppState>) {
    this.isAuthenticated$ = this.store.pipe(select(selectIsAuthenticated))
  }
}
