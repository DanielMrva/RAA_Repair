import { Component,  OnInit, OnDestroy} from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '@app/_store/app.state';
import { userLoadingSelector, userErrorSelector, selectAllUsers } from '@app/_store/_user-store/user.selectors';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { loadUsers, loadOrgUsers } from '@app/_store/_user-store/user.actions';

@Component({
  selector: 'app-user-results-page',
  templateUrl: './user-results-page.component.html',
  styleUrls: ['./user-results-page.component.css']
})
export class UserResultsPageComponent implements OnDestroy, OnInit {
  
  private subscriptions = new Subscription();

  userError$ = this.store.select(userErrorSelector);
  isLoading$ = this.store.select(userLoadingSelector);
  users$ = this.store.select(selectAllUsers);

  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.subscriptions.add(
      this.route.params.subscribe(params => {
        const orgName = params['orgName'];

        const condition = orgName ? 'orgName' : 'default';

        switch(condition) {
          case 'orgName':
            this.store.dispatch(loadOrgUsers({ orgName }));
            break;
  
          default:
            this.store.dispatch(loadUsers());
            break;
        }
      })
    )
      
  }

  ngOnDestroy(): void {
      this.subscriptions.unsubscribe();
  }

}
