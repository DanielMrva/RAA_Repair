import { Component, Input, OnChanges, SimpleChanges, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { selectAccessLevel } from '@app/_store/_auth-store/auth.selectors';
import { AppState } from '@app/_store/app.state';
import { Repair } from '@app/graphql/schemas';
import { ACCESS_LEVEL_ADMIN, ACCESS_LEVEL_TECH } from '@app/utils/constants';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs';

@Component({
  selector: 'app-repair-results-table',
  templateUrl: './repair-results-table.component.html',
  styleUrls: ['./repair-results-table.component.css']
})
export class RepairResultsTableComponent implements OnChanges, AfterViewInit  {

  @Input() repairs: Repair[] | null = [];
  dataSource: MatTableDataSource<Repair> = new MatTableDataSource<Repair>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = [
    "radioSerial",
    "radioLocation",
    "radioDetails",
    "endUserPO",
    "raaPO",
    "repairTag",
    "repairStatus",
    "dateRepairAdded",
    "techInvNum",
    "raaInvNum",
    "accessories",
    "workPerformed",
    "repHours",
    "partsUsed",
  ];

  userAccessLevel$


  ADMIN_ACCESS = ACCESS_LEVEL_ADMIN;
  TECH_ACCESS = ACCESS_LEVEL_TECH;




  constructor(
    private store: Store<AppState>
  ) {
    this.userAccessLevel$ = this.store.select(selectAccessLevel).pipe(
      tap((accessLevel) => this.updateDisplayedColumns(accessLevel))
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['repairs'] && this.repairs) {
      this.dataSource.data = this.repairs;
      if (this.paginator) {
        this.dataSource.paginator = this.paginator;
      }
      if (this.sort) {
        this.dataSource.sort = this.sort;
      }
    }
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  private updateDisplayedColumns(accessLevel: string | null): void {
    // Reset to default columns
    this.displayedColumns = [
      "radioSerial",
      "radioLocation",
      "radioDetails",
      "endUserPO",
      "raaPO",
      "repairTag",
      "repairStatus",
      "dateRepairAdded",
      "techInvNum",
      "raaInvNum",
      "accessories",
      "workPerformed",
      "repHours",
      "partsUsed",
    ];

    // Conditionally add the "remarks" column
    if (accessLevel === this.ADMIN_ACCESS || accessLevel === this.TECH_ACCESS) {
      this.displayedColumns.push("remarks");
    }
  }
}
