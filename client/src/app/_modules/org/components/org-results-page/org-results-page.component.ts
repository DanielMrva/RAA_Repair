import { Component,  OnInit, OnDestroy} from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '@app/_store/app.state';
import { orgLoadingSelector, orgErrorSelector, selectAllOrgs } from '@app/_store/_org-store/org.selectors';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { loadAllOrgs, loadLikeOrgs } from '@app/_store/_org-store/org.actions';


@Component({
  selector: 'app-org-results-page',
  templateUrl: './org-results-page.component.html',
  styleUrls: ['./org-results-page.component.css']
})
export class OrgResultsPageComponent implements OnDestroy, OnInit {

  private subscriptions = new Subscription();

  orgError$ = this.store.select(orgErrorSelector);
  isLoading$ = this.store.select(orgLoadingSelector);
  orgs$ = this.store.select(selectAllOrgs);

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
            this.store.dispatch(loadLikeOrgs({ orgName }));
            break;
  
          default:
            this.store.dispatch(loadAllOrgs());
            break;
        }
      })
    )
      
  }

  ngOnDestroy(): void {
      this.subscriptions.unsubscribe();
  }

}
