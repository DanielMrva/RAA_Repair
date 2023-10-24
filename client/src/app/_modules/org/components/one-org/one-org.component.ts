import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrganizationService } from '@app/services/orgs/organization.service';
import { Organization } from '@app/graphql/schemas/typeInterfaces';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { orgLoadingSelector, selectOneOrg, orgErrorSelector } from '@app/_store/_org-store/org.selectors';
import * as OrgActions from '@app/_store/_org-store/org.actions';
import { AppState } from '@app/_store/app.state';

@Component({
  selector: 'app-one-org',
  templateUrl: './one-org.component.html',
  styleUrls: ['./one-org.component.css']
})
export class OneOrgComponent implements OnInit{

  org: Organization | undefined;

  isLoading$: Observable<boolean>;
  orgError$: Observable<string | null>;
  oneOrg$: Observable<Organization | null>;

  constructor(
    private route: ActivatedRoute,
    private orgService: OrganizationService,
    private store: Store<AppState>
  ) {
    this.isLoading$ = this.store.select(orgLoadingSelector);
    this.orgError$ = this.store.select(orgErrorSelector);
    this.oneOrg$ = this.store.select(selectOneOrg);
  }

  // loadOrg(orgId: string): void {
  //   this.orgService.querySingleOrg(orgId)
  //   .subscribe(( { data }) => {
  //     this.org = data.org;
  //   })
  // }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const orgId = params['id'];
      // this.loadOrg(orgId);
      this.store.dispatch(OrgActions.loadOneOrg({orgId}))
    })
      
  }
}
