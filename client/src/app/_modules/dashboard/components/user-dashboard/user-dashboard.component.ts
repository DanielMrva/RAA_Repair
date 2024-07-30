import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, combineLatest } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '@app/_store/app.state';
import { loadAllRepairs, loadOrgRepairs, loadOrgLocRepairs } from '@app/_store/_repair-store/repair.actions';
import {
  selectRepairsAtLoction,
  selectIncomingRepairs,
  selectRepairsAtRAA,
  selectRepairsAtTechnician,
  selectCompleteRepairs,
  selectActiveRepairs
} from '@app/_store/_repair-store/repair.selectors';
import { selectOrgName, selectUserLocation } from '@app/_store/_auth-store/auth.selectors';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit, OnDestroy {

  activeRepairs$ = this.store.select(selectActiveRepairs);
  repairsAtLocation$ = this.store.select(selectRepairsAtLoction);
  incomingRepairs$ = this.store.select(selectIncomingRepairs);
  raaRepairs$ = this.store.select(selectRepairsAtRAA);
  techRepairs$ = this.store.select(selectRepairsAtTechnician);
  completeRepairs$ = this.store.select(selectCompleteRepairs);


  private subscriptions = new Subscription();

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {

    const userOrgName$ = this.store.select(selectOrgName);
    const userLocation$ = this.store.select(selectUserLocation);

    this.subscriptions.add(
      combineLatest([userOrgName$, userLocation$]).subscribe(([orgName, locationName]) => {
        if (orgName && locationName) {
          this.store.dispatch(loadOrgLocRepairs({ orgName, locationName }))
        }
      })
    );

  };

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  };
}
