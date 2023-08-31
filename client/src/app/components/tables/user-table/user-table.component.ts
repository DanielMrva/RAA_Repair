import { Component, Input, OnInit } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { UserDataSource } from '@app/services/users/user.dataSource';
import { UserService } from '@app/services/users/user.service';
import { TableSearchParams } from '@app/graphql/schemas';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.css']
})
export class UserTableComponent implements OnInit {
  
  @Input() searchParams: TableSearchParams = {
    queryType: '',
    queryParams: '',
  }

  displayedColumns: string[] = [
    'username',
    'email',
    'orgName',
    'accessLevel'
  ]

  constructor(private userService: UserService) {}

  dataSource = new UserDataSource(this.userService);

  ngOnInit(): void {
    switch (this.searchParams.queryType) {
      case 'orgUsers': this.dataSource.loadOrgUsers(this.searchParams.queryParams);
        break;
      default: this.dataSource.loadAllUsers();
    }
      //TODO: this.dataSource.loadUsers... ETC
  }
}
