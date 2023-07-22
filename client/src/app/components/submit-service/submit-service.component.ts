import { Component } from '@angular/core';
import { AuthService } from '@app/services/auth/auth.service';
// import { AdminSubmitComponent } from '@app/components/submit-service/admin-submit';

@Component({
  selector: 'app-submit-service',
  templateUrl: './submit-service.component.html',
  styleUrls: ['./submit-service.component.css']
})
export class SubmitServiceComponent {

  loggedUser$ = this.authService.loggedUser$;

  constructor (private authService: AuthService) {

  }

}
