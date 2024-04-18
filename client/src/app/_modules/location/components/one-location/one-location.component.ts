import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppState } from '@app/_store/app.state';
import { Store } from '@ngrx/store';
import { loadOneLocation } from '@app/_store/_location-store/location.actions';
import { selectOneLocation, locationErrorSelector, locationLoadingSelector } from '@app/_store/_location-store/location.selectors';

@Component({
  selector: 'app-one-location',
  templateUrl: './one-location.component.html',
  styleUrls: ['./one-location.component.css']
})
export class OneLocationComponent implements OnInit {

  isLoading$
  locationError$
  oneLocation$

  constructor(
    private route: ActivatedRoute,
    private store: Store<AppState>
  ) {
      this.isLoading$ = this.store.select(locationLoadingSelector);
      this.locationError$ = this.store.select(locationErrorSelector);
      this.oneLocation$ = this.store.select(selectOneLocation);
    }




  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const locationId = params['id'];
      console.log(locationId)
      this.store.dispatch(loadOneLocation({ locationId }));
    });
  }

}
