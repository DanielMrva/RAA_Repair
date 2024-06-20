import { Component, OnDestroy, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '@app/_store/app.state';
import { repairLoadingSelector, repairErrorSelector, selectAllRepairs } from '@app/_store/_repair-store/repair.selectors';
import { Subscription, Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { loadAllRepairs, loadOrgRepairs } from '@app/_store/_repair-store/repair.actions';
import { Repair } from '@app/graphql/schemas';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-repair-results-table',
  templateUrl: './repair-results-table.component.html',
  styleUrls: ['./repair-results-table.component.css']
})
export class RepairResultsTableComponent implements OnInit, OnDestroy, AfterViewInit {

  private subscriptions = new Subscription();

  isLoading$: Observable<boolean>;
  repairError$: Observable< string | null>;
  repairs$: Observable<Repair[]>;
  dataSource: MatTableDataSource<Repair> = new MatTableDataSource<Repair>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = [
    "radioSerial",
    "radioLocation",
    "endUserPO",
    "raaPO",
    "repairTag",
    "repairStatus",
    "dateRepairAdded",
    "dateSentEuRaa",
    "dateRecEuRaa",
    "dateSentRaaTech",
    "dateRecTechRaa",
    "dateSentRaaEu",
    "techInvNum",
    "raaInvNum",
    "testFreq",
    "incRxSens",
    "incFreqErr",
    "incMod",
    "incPowerOut",
    "accessories",
    "workPerformed",
    "repHours",
    "partsUsed",
    "remarks"
  ];

  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute
  ) {
    this.isLoading$ = this.store.select(repairLoadingSelector);
    this.repairError$ = this.store.select(repairErrorSelector);
    this.repairs$ = this.store.select(selectAllRepairs);
  }

  ngOnInit(): void {
    this.subscriptions.add(
      this.repairs$.subscribe((repairs) => {
        this.dataSource.data = repairs;
      })
    );

    this.subscriptions.add(
      this.route.params.subscribe(params => {
        const orgName = params['orgName'];

        if (orgName) {
          this.store.dispatch(loadOrgRepairs({ orgName }));
        } else {
          this.store.dispatch(loadAllRepairs());
        }
      })
    )
  };

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  };

  ngAfterViewInit(): void {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
  }

}
