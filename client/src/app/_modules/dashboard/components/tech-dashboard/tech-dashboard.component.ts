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
  selector: 'app-tech-dashboard',
  templateUrl: './tech-dashboard.component.html',
  styleUrls: ['./tech-dashboard.component.css']
})
export class TechDashboardComponent implements OnInit {

  incomingRepairs$ = this.store.select(selectIncomingRepairs);
  raaRepairs$ = this.store.select(selectRepairsAtRAA);
  techRepairs$ = this.store.select(selectRepairsAtTechnician);

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.dispatch(loadAllRepairs());
  }

}
