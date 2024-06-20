import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '@app/_store/app.state';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Location } from '@app/graphql/schemas';
import { locationLoadingSelector, locationErrorSelector, selectAllLocations } from '@app/_store/_location-store/location.selectors';
import { loadAllLocations, loadOrgLocations } from '@app/_store/_location-store/location.actions';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-location-results-table',
  templateUrl: './location-results-table.component.html',
  styleUrls: ['./location-results-table.component.css']
})
export class LocationResultsTableComponent implements OnInit, OnDestroy, AfterViewInit {

  private subscriptions = new Subscription();

  isLoading$: Observable<boolean>
  locationError$: Observable<string | null>
  locations$: Observable<Location[]>
  dataSource: MatTableDataSource<Location> = new MatTableDataSource<Location>();

  displayedColumns: string[] = [
    'locationName',
    'orgName',
    'address',
    'radios'
  ];

  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute
  ) {
    this.isLoading$ = this.store.select(locationLoadingSelector);
    this.locationError$ = this.store.select(locationErrorSelector);
    this.locations$ = this.store.select(selectAllLocations);
  }

  ngOnInit(): void {
    this.subscriptions.add(
      this.locations$.subscribe((locations) => {
        this.dataSource.data = locations;
      })
    );

    this.subscriptions.add(
      this.route.params.subscribe(params => {
        const orgName = params['orgName'];
        const locationName = params['locationName'];

        const condition = orgName ? 'orgName' : 'default';

        switch (condition) {
          case 'orgName':
            console.log(`dispatch loadOrgLocations with ${orgName}`)
            this.store.dispatch(loadOrgLocations({ orgName }));
            break;

          default:
            this.store.dispatch(loadAllLocations());
            break;
        }
      })
    )
  }


  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  };

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  };



}
