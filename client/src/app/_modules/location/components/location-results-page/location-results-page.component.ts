import { Component,  OnInit, OnDestroy} from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '@app/_store/app.state';
import { locationErrorSelector, selectAllLocations, manyLocationsLoadingSelector } from '@app/_store/_location-store/location.selectors';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { loadAllLocations, loadOrgLocations, loadLocationByName } from '@app/_store/_location-store/location.actions';
import { Observable } from 'rxjs';
import { Location } from '@app/graphql/schemas';

@Component({
  selector: 'app-location-results-page',
  templateUrl: './location-results-page.component.html',
  styleUrls: ['./location-results-page.component.css']
})
export class LocationResultsPageComponent implements OnDestroy, OnInit {

  private subscriptions = new Subscription();

  locationError$ = this.store.select(locationErrorSelector);
  isLoading$ = this.store.select(manyLocationsLoadingSelector);
  locations$ = this.store.select(selectAllLocations);

  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.subscriptions.add(
      this.route.params.subscribe(params => {
        const locationName = params['locationName'];
        const orgName = params['orgName'];
  
        if (orgName && locationName) {
          this.store.dispatch(loadLocationByName({ orgName, locationName }));
        } else if (orgName) {
          this.store.dispatch(loadOrgLocations({ orgName }));
        } else {
          this.store.dispatch(loadAllLocations());
        }
      })
    );
  }
  

  ngOnDestroy(): void {
      this.subscriptions.unsubscribe();
  }

}
