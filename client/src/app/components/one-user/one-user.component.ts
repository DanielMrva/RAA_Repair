import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '@app/services/users/user.service';
import { User } from '@app/graphql/schemas/typeInterfaces';

@Component({
  selector: 'app-one-user',
  templateUrl: './one-user.component.html',
  styleUrls: ['./one-user.component.css']
})
export class OneUserComponent implements OnInit{
  user: User | undefined;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService
  ) { }

  loadUser(userId: string): void {
    this.userService.querySingleUser(userId)
    .subscribe(( { data } ) => {
     this.user = data.user;
    })   
   }


  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const userId = params['id'];
      this.loadUser(userId)
    });
      
  }


}
