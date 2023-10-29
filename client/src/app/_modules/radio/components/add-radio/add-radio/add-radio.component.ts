import { Component } from '@angular/core';
import { AuthService } from '@app/services/auth/auth.service';
import { AppState } from '@app/_store/app.state';
import { select, Store } from '@ngrx/store';
import { selectAccessLevel } from '@app/_store/_auth-store/auth.selectors';

@Component({
  selector: 'app-add-radio',
  templateUrl: './add-radio.component.html',
  styleUrls: ['./add-radio.component.css']
})
export class AddRadioComponent {

  userAccessLevel$ = this.store.select(selectAccessLevel)

  loggedUser$ = this.authService.loggedUser$;

  constructor (
    private authService: AuthService,
    private store: Store<AppState>
    ) {
    
  }

}
