import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '@app/services/users/user.service';
import { User } from '@app/graphql/schemas/typeInterfaces';
import { AppState } from '@app/_store/app.state';
import { Store } from '@ngrx/store';
import { loadOneUser } from '@app/_store/_user-store/user.actions';
import { selectOneUser, userErrorSelector, userLoadingSelector } from '@app/_store/_user-store/user.selectors';

@Component({
  selector: 'app-one-user',
  templateUrl: './one-user.component.html',
  styleUrls: ['./one-user.component.css']
})
export class OneUserComponent implements OnInit{

  user: User | undefined;

  isLoading$
  userError$
  oneUser$

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private store: Store<AppState>
  ) {
    this.isLoading$ = this.store.select(userLoadingSelector);
    this.userError$ = this.store.select(userErrorSelector);
    this.oneUser$ = this.store.select(selectOneUser);
   }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const userId = params['id'];
      this.store.dispatch(loadOneUser({userId}))
    });
      
  }

}
