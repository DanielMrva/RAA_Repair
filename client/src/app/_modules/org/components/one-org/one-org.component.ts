import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { orgLoadingSelector, selectOneOrg, orgErrorSelector } from '@app/_store/_org-store/org.selectors';
import * as OrgActions from '@app/_store/_org-store/org.actions';
import { AppState } from '@app/_store/app.state';

@Component({
  selector: 'app-one-org',
  templateUrl: './one-org.component.html',
  styleUrls: ['./one-org.component.css']
})
export class OneOrgComponent implements OnInit{

  isLoading$ = this.store.select(orgLoadingSelector);
  orgError$ = this.store.select(orgErrorSelector);
  oneOrg$ = this.store.select(selectOneOrg);

  constructor(
    private route: ActivatedRoute,
    private store: Store<AppState>
  ) { }


  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const orgId = params['id'];
      this.store.dispatch(OrgActions.loadOneOrg({orgId}))
    })
      
  }
}
