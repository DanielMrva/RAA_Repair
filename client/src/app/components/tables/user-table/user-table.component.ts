import { Component, OnInit } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { UserDataSource } from '@app/services/users/user.dataSource';
import { UserService } from '@app/services/users/user.service';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.css']
})
export class UserTableComponent implements OnInit {
  


  ngOnInit(): void {
      //TODO: this.dataSource.loadUsers... ETC
  }
}
