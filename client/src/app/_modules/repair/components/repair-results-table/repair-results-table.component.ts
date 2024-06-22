import { Component, Input, OnChanges, SimpleChanges, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Repair } from '@app/graphql/schemas';

@Component({
  selector: 'app-repair-results-table',
  templateUrl: './repair-results-table.component.html',
  styleUrls: ['./repair-results-table.component.css']
})
export class RepairResultsTableComponent implements OnChanges, AfterViewInit  {

  @Input() repairs: Repair[] | null = [];
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
  dataSource: MatTableDataSource<Repair> = new MatTableDataSource<Repair>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor() { }

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
}
