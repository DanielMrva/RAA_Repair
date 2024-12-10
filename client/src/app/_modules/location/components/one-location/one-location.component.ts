import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppState } from '@app/_store/app.state';
import { Store } from '@ngrx/store';
import { loadAllLocations, loadLocationByName, loadOneLocation } from '@app/_store/_location-store/location.actions';
import { selectOneLocation, locationErrorSelector, locationLoadingSelector } from '@app/_store/_location-store/location.selectors';
import { Subscription } from 'rxjs';
import { ACCESS_LEVEL_ADMIN } from '@app/utils/constants';

@Component({
  selector: 'app-one-location',
  templateUrl: './one-location.component.html',
  styleUrls: ['./one-location.component.css']
})
export class OneLocationComponent implements OnInit, OnDestroy {

  private subscriptions = new Subscription();

  isLoading$;
  locationError$;
  oneLocation$;

  ADMIN_ACCESS = ACCESS_LEVEL_ADMIN;

  constructor(
    private route: ActivatedRoute,
    private store: Store<AppState>,
    private router: Router
  ) {
      this.isLoading$ = this.store.select(locationLoadingSelector);
      this.locationError$ = this.store.select(locationErrorSelector);
      this.oneLocation$ = this.store.select(selectOneLocation);
  }

  ngOnInit(): void {
    this.subscriptions.add(
      this.route.params.subscribe((params) => {
        const locationId = params['id'];
        const orgName = params['orgName'];
        const locationName = params['locationName']

        if (orgName && locationName) {
          this.store.dispatch(loadLocationByName({ orgName, locationName}));
        } else if (locationId) {
          this.store.dispatch(loadOneLocation({ locationId}))
        } else {
          this.store.dispatch(loadAllLocations());
          this.router.navigate(['location-results/'])
        }
      })
    );
  }
  
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
