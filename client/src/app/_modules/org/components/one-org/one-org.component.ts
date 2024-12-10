import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { orgLoadingSelector, selectOneOrg, orgErrorSelector } from '@app/_store/_org-store/org.selectors';
import * as OrgActions from '@app/_store/_org-store/org.actions';
import { AppState } from '@app/_store/app.state';
import { Subscription } from 'rxjs';
import { ACCESS_LEVEL_ADMIN } from '@app/utils/constants';
import { selectAccessLevel } from '@app/_store/_auth-store/auth.selectors';

@Component({
  selector: 'app-one-org',
  templateUrl: './one-org.component.html',
  styleUrls: ['./one-org.component.css']
})
export class OneOrgComponent implements OnInit, OnDestroy {

  private subscriptions = new Subscription();

  isLoading$
  orgError$
  oneOrg$


  ADMIN_ACCESS = ACCESS_LEVEL_ADMIN;

  constructor(
    private route: ActivatedRoute,
    private store: Store<AppState>
  ) {
      this.isLoading$ = this.store.select(orgLoadingSelector);
      this.orgError$ = this.store.select(orgErrorSelector);
      this.oneOrg$ = this.store.select(selectOneOrg);

    }

    ngOnInit(): void {

    this.subscriptions.add(
      this.route.params.subscribe((params) => {
        const orgId = params['id'];
        this.store.dispatch(OrgActions.loadOneOrg({orgId}))
      })
  
    );

      
  };

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
};
}
