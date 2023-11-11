import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RepairService } from '@app/services/repairs/repair.service';
import { Repair } from '@app/graphql/schemas/typeInterfaces';
import { Store } from '@ngrx/store';
import { AppState } from '@app/_store/app.state';
import { loadOneRepair } from '@app/_store/_repair-store/repair.actions';
import { selectOneRepair, repairErrorSelector, repairLoadingSelector } from '@app/_store/_repair-store/repair.selectors';

@Component({
  selector: 'app-one-repair',
  templateUrl: './one-repair.component.html',
  styleUrls: ['./one-repair.component.css']
})
export class OneRepairComponent implements OnInit{

  oneRepair$ = this.store.select(selectOneRepair);
  repairError$ = this.store.select(repairErrorSelector);
  isLoading$ = this.store.select(repairLoadingSelector);

  repair: Repair | undefined;

  constructor(
    private route: ActivatedRoute,
    private repairService: RepairService,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
      this.route.params.subscribe((params) => {
        const repairId = params['id'];
        this.loadRepair(repairId)
      });
  }

  loadRepair(repairId: string): void {
    this.store.dispatch(loadOneRepair({repairId: repairId}));
  }
}

