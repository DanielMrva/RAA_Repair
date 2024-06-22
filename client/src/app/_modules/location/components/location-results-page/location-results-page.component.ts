import { Component,  OnInit, OnDestroy} from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '@app/_store/app.state';
import { locationLoadingSelector, locationErrorSelector, selectAllLocations } from '@app/_store/_location-store/location.selectors';
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
  isLoading$ = this.store.select(locationLoadingSelector);
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

        const condition = locationName ? 'locationName' : orgName ? 'orgName' : 'default';

        switch(condition) {
          case 'locationName':
            this.store.dispatch(loadLocationByName({ locationName }));
            break;

          case 'orgName':
            this.store.dispatch(loadOrgLocations({orgName}));
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
  }

}
