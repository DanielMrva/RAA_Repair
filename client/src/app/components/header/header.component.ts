import { Component, OnInit } from '@angular/core';
import { User } from '@app/graphql/schemas';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ACCESS_LEVEL_ADMIN, ACCESS_LEVEL_TECH, ACCESS_LEVEL_USER } from '@app/utils/constants';



@Component({
  selector: 'app-header-old',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{

  loggedUser$ = this.authService.loggedUser$

  userAccessLevel: string | null = this.authService.getUserAccessLevel();


  ADMIN_ACESS = ACCESS_LEVEL_ADMIN;
  USER_ACCESS = ACCESS_LEVEL_USER;
  TECH_ACCESS = ACCESS_LEVEL_TECH;

  constructor (
    private authService: AuthService,
    ) {}

  ngOnInit(): void {


  
  }

  logout() {
    this.authService.logout();
  }

}
