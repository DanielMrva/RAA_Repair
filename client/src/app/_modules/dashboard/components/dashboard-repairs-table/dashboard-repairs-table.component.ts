import { Component, Input, OnChanges, SimpleChanges, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Repair } from '@app/graphql/schemas';

@Component({
  selector: 'app-dashboard-repairs-table',
  templateUrl: './dashboard-repairs-table.component.html',
  styleUrls: ['./dashboard-repairs-table.component.css']
})
export class DashboardRepairsTableComponent implements OnChanges, AfterViewInit {

  @Input() repairs: Repair[] | null = [];
  displayedColumns: string[] = ['repairTag', 'repairStatus', 'radioDetails', 'dateFields'];
  dataSource: MatTableDataSource<Repair> = new MatTableDataSource<Repair>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['repairs'] && changes['repairs'].currentValue?.length > 0) {
      console.log('Updating table with repairs:', this.repairs);
      this.dataSource.data = this.repairs || [];
    }
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}
