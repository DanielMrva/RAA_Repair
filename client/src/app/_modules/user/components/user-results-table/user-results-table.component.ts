import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '@app/_store/app.state';
import { userLoadingSelector, userErrorSelector, selectAllUsers } from '@app/_store/_user-store/user.selectors';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { loadUsers, loadOrgUsers } from '@app/_store/_user-store/user.actions';
import { Observable } from 'rxjs';
import { User } from '@app/graphql/schemas';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-user-results-table',
  templateUrl: './user-results-table.component.html',
  styleUrls: ['./user-results-table.component.css']
})
export class UserResultsTableComponent implements OnInit, OnDestroy, AfterViewInit {

  private subscriptions = new Subscription();

  isLoading$: Observable<boolean>
  userError$: Observable<string | null>
  users$: Observable<User[]>
  dataSource: MatTableDataSource<User> = new MatTableDataSource<User>();

  displayedColumns: string[] = [
    'username',
    'email',
    'orgName',
    'accessLevel'
  ]

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute
  ) {
    this.isLoading$ = this.store.select(userLoadingSelector);
    this.userError$ = this.store.select(userErrorSelector);
    this.users$ = this.store.select(selectAllUsers);
  }


  ngOnInit(): void {
    this.subscriptions.add(
      this.users$.subscribe((users) => {
        this.dataSource.data = users;
      })
    );

    this.subscriptions.add(
      this.route.params.subscribe(params => {
        const orgName = params['userName'];

        const condition = orgName ? 'orgName' : 'default';

        switch (condition) {
          case 'orgName':
            // Dispatch action to fetch users by userName
            this.store.dispatch(loadOrgUsers({ orgName }));
            break;

          default:
            this.store.dispatch(loadUsers());
            break;
        }

      })
    );
  };

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  };

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }


}
