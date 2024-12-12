import { Component, Input, OnChanges, SimpleChanges, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Part } from '@app/graphql/schemas';

@Component({
  selector: 'app-dashboard-parts-table',
  templateUrl: './dashboard-parts-table.component.html',
  styleUrls: ['./dashboard-parts-table.component.css']
})
export class DashboardPartsTableComponent implements OnChanges, AfterViewInit {

  @Input() parts: Part[] | null = [];

  displayedColumns: string[] = ['partNumber', 'description', 'manufacturer', 'cost', 'msrp', 'editColumn'];

  dataSource: MatTableDataSource<Part> = new MatTableDataSource<Part>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
      
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['parts'] && changes['parts'].currentValue?.length > 0) {
      this.dataSource.data = this.parts || [];
    }
      
  }

}
