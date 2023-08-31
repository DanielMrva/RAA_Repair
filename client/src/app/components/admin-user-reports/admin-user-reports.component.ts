import { Component } from '@angular/core';
import { TableSearchParams } from '@app/graphql/schemas';

@Component({
  selector: 'app-admin-user-reports',
  templateUrl: './admin-user-reports.component.html',
  styleUrls: ['./admin-user-reports.component.css']
})
export class AdminUserReportsComponent {

  queryParams: TableSearchParams = {
    queryType: '',
    queryParams: '',
  }

}
