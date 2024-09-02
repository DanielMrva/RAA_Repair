import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';


import { MainDashboardComponent } from './components/main-dashboard/main-dashboard.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { DashboardRepairsTableComponent } from './components/dashboard-repairs-table/dashboard-repairs-table.component';
import { TechDashboardComponent } from './components/tech-dashboard/tech-dashboard.component';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { UtilityModule } from '../utility/utility.module';



@NgModule({
  declarations: [
    MainDashboardComponent,
    AdminDashboardComponent,
    DashboardRepairsTableComponent,
    TechDashboardComponent,
    UserDashboardComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatTabsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
    MatButtonModule,
    UtilityModule,
  ]
})
export class DashboardModule { }