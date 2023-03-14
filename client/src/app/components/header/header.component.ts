import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{

  logged: boolean = false;

  constructor (private authService: AuthService) {

  }

  ngOnInit(): void {
      this.authService.isAuthenticated
      .subscribe(isAuthenticated => {
        this.logged = isAuthenticated
      });
  }

  logout() {
    this.authService.logout();
  }

}
