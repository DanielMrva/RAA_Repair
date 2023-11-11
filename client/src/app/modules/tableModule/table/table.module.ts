import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { UserTableComponent } from '@app/components/tables/user-table/user-table.component';
import { OrgTableComponent } from '@app/components/tables/org-table/org-table.component';
import { RadioTableComponent } from '@app/components/tables/radio-table/radio-table.component';
import { RepairTableComponent } from '@app/components/tables/repair-table/repair-table.component';
import { DataTableComponent } from '@app/components/tables/data-table/data-table.component';
import { UserService } from '@app/services/users/user.service';
import { RadioService } from '@app/services/radios/radio.service';
import { RepairService } from '@app/services/repairs/repair.service';
import { OrganizationService } from '@app/services/orgs/organization.service';
import { UserDataSource } from '@app/services/users/user.dataSource';
import { OrganizationDataSource } from '@app/services/orgs/organization.dataSource';
import { RadioDataSource } from '@app/services/radios/radio.dataSource';
import { RepairDataSource } from '@app/services/repairs/repair.dataSource';

@NgModule({
  declarations: [ UserTableComponent, OrgTableComponent, RadioTableComponent, RepairTableComponent, DataTableComponent],
  imports: [ CommonModule, MatTableModule, MatSortModule, RouterModule ],
  exports: [ UserTableComponent, OrgTableComponent, RadioTableComponent, RepairTableComponent, DataTableComponent],
  providers: [ UserService, UserDataSource, OrganizationService, OrganizationDataSource, RadioService, RadioDataSource, RepairService, RepairDataSource]
})
export class TableModule { }
