import { Component, Input, OnChanges, SimpleChanges, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Radio } from '@app/graphql/schemas';

@Component({
  selector: 'app-radio-results-table',
  templateUrl: './radio-results-table.component.html',
  styleUrls: ['./radio-results-table.component.css']
})
export class RadioResultsTableComponent implements OnChanges, AfterViewInit {

  @Input() radios: Radio[] | null = [];
  displayedColumns: string[] = [
    'locationName',
    'datePurchased',
    'dateEntered',
    'inventoryNumber',
    'make',
    'model',
    'progChannels',
    'notes',
    'serialNumber',
    'serviceRecord',
    'warranty',
    'refurb',
    'radioType'
  ];
  dataSource: MatTableDataSource<Radio> = new MatTableDataSource<Radio>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['radios'] && this.radios) {
      this.dataSource.data = this.radios;
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
