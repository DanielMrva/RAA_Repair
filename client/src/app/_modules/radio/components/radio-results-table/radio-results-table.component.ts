import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '@app/_store/app.state';
import { radioLoadingSelector, radioErrorSelector, selectRadios, selectAllRadios } from '@app/_store/_radio-store/radio.selectors';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { loadAllRadios, loadLikeOrgRadios, loadLikeSerialRadio } from '@app/_store/_radio-store/radio.actions';
import { Observable } from 'rxjs';
import { Radio } from '@app/graphql/schemas';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-radio-results-table',
  templateUrl: './radio-results-table.component.html',
  styleUrls: ['./radio-results-table.component.css']
})
export class RadioResultsTableComponent implements OnInit, OnDestroy {

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
      // Any additional initialization logic, such as dispatching store actions to load data
      this.subscriptions.add(
        this.route.params.subscribe(params => {
          const orgName = params['orgName'];
          const serialNumber = params['serialNumber'];
          const model = params['model'];
  
          if (orgName) {
            // Dispatch action to fetch radios by organization
            this.store.dispatch(loadLikeOrgRadios({ orgName }));
          } else if (serialNumber || model) {
            // Dispatch action to fetch radios by serial number and model
            this.store.dispatch(loadLikeSerialRadio({ serialNumber, model }));
          } else {
            this.store.dispatch(loadAllRadios());
          }
        })
      );
  };

  ngOnDestroy(): void {
      this.subscriptions.unsubscribe();
  }
}
