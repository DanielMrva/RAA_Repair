import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '@app/_store/app.state';
import { radioLoadingSelector, radioErrorSelector, selectAllRadios } from '@app/_store/_radio-store/radio.selectors';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { loadAllRadios, loadLikeOrgRadios, loadLikeSerialRadio } from '@app/_store/_radio-store/radio.actions';
import { Observable } from 'rxjs';
import { Radio } from '@app/graphql/schemas';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-radio-results-table',
  templateUrl: './radio-results-table.component.html',
  styleUrls: ['./radio-results-table.component.css']
})
export class RadioResultsTableComponent implements OnInit, OnDestroy, AfterViewInit {

  private subscriptions = new Subscription();

  isLoading$: Observable<boolean>
  radioError$: Observable<string | null>
  radios$: Observable<Radio[]>
  dataSource: MatTableDataSource<Radio> = new MatTableDataSource<Radio>();


  displayedColumns: string[] = [
    'locationName',
    'datePurchased',
    'dateEntered',
    'inventoryNumber',
    'make',
    'model',
    'progChannels',
    'notes',
    'serialNumber',
    'serviceRecord',
    'warranty',
    'refurb',
    'radioType'
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute
  ) {
    this.isLoading$ = this.store.select(radioLoadingSelector);
    this.radioError$ = this.store.select(radioErrorSelector);
    this.radios$ = this.store.select(selectAllRadios);
  }

  ngOnInit(): void {

    this.subscriptions.add(
      this.radios$.subscribe((radios) => {
        this.dataSource.data = radios;
      })
    );
    this.subscriptions.add(
      this.route.params.subscribe(params => {
        const orgName = params['orgName'];
        const serialNumber = params['serialNumber'];
        const model = params['model'];

        const condition = orgName ? 'orgName' : (serialNumber || model) ? 'serialOrModel' : 'default';

        switch (condition) {
          case 'orgName':
            // Dispatch action to fetch radios by organization
            this.store.dispatch(loadLikeOrgRadios({ orgName }));
            break;

          case 'serialOrModel':
            // Dispatch action to fetch radios by serial number and model
            this.store.dispatch(loadLikeSerialRadio({ serialNumber, model }));
            break;

          default:
            // Dispatch action to fetch all radios
            this.store.dispatch(loadAllRadios());
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
  };
}
