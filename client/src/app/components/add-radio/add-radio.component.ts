import { Component } from '@angular/core';
import { AuthService } from '@app/services/auth/auth.service';

@Component({
  selector: 'app-add-radio',
  templateUrl: './add-radio.component.html',
  styleUrls: ['./add-radio.component.css']
})
export class AddRadioComponent {

  loggedUser$ = this.authService.loggedUser$;

  constructor (private authService: AuthService) {
    
  }

}
