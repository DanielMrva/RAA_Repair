import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '@app/graphql/schemas/typeInterfaces';
import { AppState } from '@app/_store/app.state';
import { Store } from '@ngrx/store';
import { loadOneUser } from '@app/_store/_user-store/user.actions';
import { selectOneUser, userErrorSelector, userLoadingSelector } from '@app/_store/_user-store/user.selectors';
import { Subscription } from 'rxjs';
import { ACCESS_LEVEL_ADMIN } from '@app/utils/constants';
import { selectAccessLevel } from '@app/_store/_auth-store/auth.selectors';

@Component({
  selector: 'app-one-user',
  templateUrl: './one-user.component.html',
  styleUrls: ['./one-user.component.css']
})
export class OneUserComponent implements OnInit, OnDestroy {

  private subscriptions = new Subscription();

  user: User | undefined;

  isLoading$
  userError$
  oneUser$

  userAccessLevel$


  ADMIN_ACCESS = ACCESS_LEVEL_ADMIN;

  constructor(
    private route: ActivatedRoute,
    private store: Store<AppState>
  ) {
    this.isLoading$ = this.store.select(userLoadingSelector);
    this.userError$ = this.store.select(userErrorSelector);
    this.oneUser$ = this.store.select(selectOneUser);

    this.userAccessLevel$ = this.store.select(selectAccessLevel);

  }

  ngOnInit(): void {

    this.subscriptions.add(
      this.route.params.subscribe((params) => {
        const userId = params['id'];
        this.store.dispatch(loadOneUser({ userId }))
      })
    );
  };


  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  };

}
