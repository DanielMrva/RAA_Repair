import { Component, Input, OnChanges, SimpleChanges, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { User } from '@app/graphql/schemas';

@Component({
  selector: 'app-user-results-table',
  templateUrl: './user-results-table.component.html',
  styleUrls: ['./user-results-table.component.css']
})
export class UserResultsTableComponent implements OnChanges, AfterViewInit {

  @Input() users: User[] | null = [];
  displayedColumns: string[] = [
    'username',
    'email',
    'orgName',
    'accessLevel'
  ];
  dataSource: MatTableDataSource<User> = new MatTableDataSource<User>();


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor() { }



  ngOnChanges(changes: SimpleChanges): void {
    if (changes['users'] && this.users) {
      this.dataSource.data = this.users;
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
