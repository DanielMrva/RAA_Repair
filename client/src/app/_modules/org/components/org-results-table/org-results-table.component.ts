import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '@app/_store/app.state';
import { orgLoadingSelector, orgErrorSelector, selectAllOrgs } from '@app/_store/_org-store/org.selectors';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { loadAllOrgs, loadLikeOrgs } from '@app/_store/_org-store/org.actions';
import { Observable } from 'rxjs';
import { Organization } from '@app/graphql/schemas';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-org-results-table',
  templateUrl: './org-results-table.component.html',
  styleUrls: ['./org-results-table.component.css']
})
export class OrgResultsTableComponent implements OnInit, OnDestroy {

  private subscriptions = new Subscription();

  isLoading$: Observable<boolean>
  orgError$: Observable<string | null>
  orgs$: Observable<Organization[]>
  dataSource: MatTableDataSource<Organization> = new MatTableDataSource<Organization>();

  displayedColumns: string[] = [
    'orgName',
    'locations',
    'users'
  ]

  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute
  ) {
    this.isLoading$ = this.store.select(orgLoadingSelector);
    this.orgError$ = this.store.select(orgErrorSelector);
    this.orgs$ = this.store.select(selectAllOrgs);
  }


  ngOnInit(): void {
    this.subscriptions.add(
      this.orgs$.subscribe((orgs) => {
        this.dataSource.data = orgs;
      })
    );
  
    this.subscriptions.add(
      this.route.params.subscribe(params => {
        const orgName = params['orgName'];
  
        const condition = orgName ? 'orgName' : 'default';
  
        switch(condition) {
          case 'orgName':
            // Dispatch action to fetch orgs by orgName
            this.store.dispatch(loadLikeOrgs({ orgName }));
            break;
  
          default:
            this.store.dispatch(loadAllOrgs());
            break;
        }
  
      })
    );
  };
  
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();  
  };

}
