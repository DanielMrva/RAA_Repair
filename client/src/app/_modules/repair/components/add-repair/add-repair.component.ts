import { Component } from '@angular/core';
import { AuthService } from '@app/services/auth/auth.service';


@Component({
  selector: 'app-add-repair',
  templateUrl: './add-repair.component.html',
  styleUrls: ['./add-repair.component.css']
})

export class AddRepairComponent {

  loggedUser$ = this.authService.loggedUser$;

  constructor (private authService: AuthService) {

  }

}
