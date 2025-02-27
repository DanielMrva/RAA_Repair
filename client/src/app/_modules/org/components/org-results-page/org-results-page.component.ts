import { Component,  OnInit, OnDestroy} from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '@app/_store/app.state';
import { orgErrorSelector, selectAllOrgs, manyOrgsLoadingSelector } from '@app/_store/_org-store/org.selectors';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { loadAllOrgs, loadLikeOrgs, loadOrgsByLikeTag, loadOrgsByTag, loadOrgsWithFilter } from '@app/_store/_org-store/org.actions';
import { OrgFilter } from '@app/graphql/schemas';


@Component({
  selector: 'app-org-results-page',
  templateUrl: './org-results-page.component.html',
  styleUrls: ['./org-results-page.component.css']
})
export class OrgResultsPageComponent implements OnDestroy, OnInit {

  private subscriptions = new Subscription();

  orgError$ = this.store.select(orgErrorSelector);
  isLoading$ = this.store.select(manyOrgsLoadingSelector);
  orgs$ = this.store.select(selectAllOrgs);

  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.subscriptions.add(
      this.route.queryParams.subscribe(params => {
        const filter: OrgFilter = {
          orgName: params['orgName'],
          tagNames: params['tagNames'] ? params['tagNames'].split(',').map((n: string) => n.trim()): undefined,
          tagIds: params['tagIds'] ? params['tagIds'].split(',').map((i: string) => i.trim()): undefined,
        }
        this.store.dispatch(loadOrgsWithFilter({ filter }))
      })
    );
      
  }

  ngOnDestroy(): void {
      this.subscriptions.unsubscribe();
  }

}
