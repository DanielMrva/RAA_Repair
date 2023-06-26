import { Component, OnInit } from '@angular/core';
import { User } from '@app/graphql/schemas';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{

  loggedUser$ = this.authService.loggedUser$

  constructor (private authService: AuthService) {

  }

  ngOnInit(): void {
  
  }

  logout() {
    this.authService.logout();
  }

}
