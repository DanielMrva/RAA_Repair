import { Component } from '@angular/core';
import { ACCESS_LEVEL_ADMIN, ACCESS_LEVEL_TECH, ACCESS_LEVEL_USER } from '@app/utils/constants';
import { Store } from '@ngrx/store';
import { AppState } from '@app/_store/app.state';
import { selectAccessLevel } from '@app/_store/_auth-store/auth.selectors';

@Component({
  selector: 'app-main-dashboard',
  templateUrl: './main-dashboard.component.html',
  styleUrls: ['./main-dashboard.component.css']
})
export class MainDashboardComponent {

  userAccessLevel$ = this.store.select(selectAccessLevel);

  
  ADMIN_ACCESS = ACCESS_LEVEL_ADMIN;
  USER_ACCESS = ACCESS_LEVEL_USER;
  TECH_ACCESS = ACCESS_LEVEL_TECH;

  constructor(
    private store: Store<AppState>
  ) {}

}
