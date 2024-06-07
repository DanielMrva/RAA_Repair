import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppState } from '@app/_store/app.state';
import { Store } from '@ngrx/store';
import { loadOneLocation } from '@app/_store/_location-store/location.actions';
import { selectOneLocation, locationErrorSelector, locationLoadingSelector } from '@app/_store/_location-store/location.selectors';
import { Subscription } from 'rxjs';
import { selectAccessLevel } from '@app/_store/_auth-store/auth.selectors';
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
  userAccessLevel$;

  ADMIN_ACCESS = ACCESS_LEVEL_ADMIN;

  constructor(
    private route: ActivatedRoute,
    private store: Store<AppState>
  ) {
      this.isLoading$ = this.store.select(locationLoadingSelector);
      this.locationError$ = this.store.select(locationErrorSelector);
      this.oneLocation$ = this.store.select(selectOneLocation);
      this.userAccessLevel$ = this.store.select(selectAccessLevel);
  }

  ngOnInit(): void {
    this.subscriptions.add(
      this.route.params.subscribe((params) => {
        const locationId = params['id'];
        this.store.dispatch(loadOneLocation({ locationId }));
      })
    );
  }
  
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
