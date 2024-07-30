import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '@app/_store/app.state';
import { selectOrgName } from '@app/_store/_auth-store/auth.selectors';


@Component({
  selector: 'app-user-nav',
  templateUrl: './user-nav.component.html',
  styleUrls: ['./user-nav.component.css']
})
export class UserNavComponent {



  userOrgName$

  constructor(private store: Store<AppState>) {
    this.userOrgName$ = this.store.select(selectOrgName)
  }


}
