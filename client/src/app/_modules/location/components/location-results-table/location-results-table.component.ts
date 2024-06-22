import { Component, Input, OnChanges, SimpleChanges, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Location } from '@app/graphql/schemas';

@Component({
  selector: 'app-location-results-table',
  templateUrl: './location-results-table.component.html',
  styleUrls: ['./location-results-table.component.css']
})
export class LocationResultsTableComponent implements OnChanges, AfterViewInit {

  @Input() locations: Location[] | null = [];
  displayedColumns: string[] = [
    'locationName',
    'orgName',
    'address',
    'radios'
  ];
  dataSource: MatTableDataSource<Location> = new MatTableDataSource<Location>();
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['locations'] && this.locations) {
      this.dataSource.data = this.locations;
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
