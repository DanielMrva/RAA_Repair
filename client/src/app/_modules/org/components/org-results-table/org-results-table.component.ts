import { Component, Input, OnChanges, SimpleChanges, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Organization } from '@app/graphql/schemas';

@Component({
  selector: 'app-org-results-table',
  templateUrl: './org-results-table.component.html',
  styleUrls: ['./org-results-table.component.css']
})
export class OrgResultsTableComponent implements OnChanges, AfterViewInit {

  @Input() organizations: Organization[] | null = [];
  displayedColumns: string[] = [
    'orgName',
    'locations',
    'users'
  ];
  dataSource: MatTableDataSource<Organization> = new MatTableDataSource<Organization>();
 
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['organizations'] && this.organizations) {
      this.dataSource.data = this.organizations;
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