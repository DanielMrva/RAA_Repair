import { Component } from '@angular/core';
import { AppState } from '@app/_store/app.state';
import { Store } from '@ngrx/store';
import { ACCESS_LEVEL_ADMIN, ACCESS_LEVEL_TECH, ACCESS_LEVEL_USER } from '@app/utils/constants';

@Component({
  selector: 'app-add-radio',
  templateUrl: './add-radio.component.html',
  styleUrls: ['./add-radio.component.css']
})
export class AddRadioComponent {


  ADMIN_ACCESS = ACCESS_LEVEL_ADMIN;
  TECH_ACCESS = ACCESS_LEVEL_TECH;
  USER_ACCESS = ACCESS_LEVEL_USER;


  constructor (
    private store: Store<AppState>
    ) {}

}
