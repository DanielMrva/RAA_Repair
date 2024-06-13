import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '@app/_store/app.state';
import { loadAllRepairs } from '@app/_store/_repair-store/repair.actions';
import {
  selectActiveRepairs,
  selectIncomingRepairs,
  selectRepairsAtRAA,
  selectRepairsAtTechnician,
  selectCompleteRepairs
} from '@app/_store/_repair-store/repair.selectors';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit{

  activeRepairs$ = this.store.select(selectActiveRepairs);
  incomingRepairs$ = this.store.select(selectIncomingRepairs);
  raaRepairs$ = this.store.select(selectRepairsAtRAA);
  techRepairs$ = this.store.select(selectRepairsAtTechnician);
  completeRepairs$ = this.store.select(selectCompleteRepairs);

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.dispatch(loadAllRepairs());
  }

}

