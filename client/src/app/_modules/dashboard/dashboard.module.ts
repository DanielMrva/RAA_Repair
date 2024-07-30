// import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';

// import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { RouterModule } from '@angular/router';

// // Angular Material Modules
// import { MatAutocompleteModule } from '@angular/material/autocomplete';
// import { MatButtonModule } from '@angular/material/button';
// import { MatDatepickerModule } from '@angular/material/datepicker';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatIconModule } from '@angular/material/icon';
// import { MatNativeDateModule } from '@angular/material/core';
// import { MatOptionModule } from '@angular/material/core';
// import { MatPaginatorModule } from '@angular/material/paginator';
// import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
// import { MatRadioModule } from '@angular/material/radio';
// import { MatSelectModule } from '@angular/material/select';
// import { MatSortModule } from '@angular/material/sort';
// import { MatTableModule } from '@angular/material/table';
// import { MatTabsModule } from '@angular/material/tabs';

// // Other Third-Party Modules
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// import { MainDashboardComponent } from './components/main-dashboard/main-dashboard.component';
// import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
// import { DashboardRepairsTableComponent } from './components/dashboard-repairs-table/dashboard-repairs-table.component';
// import { UtilModuleModule } from '../util-module/util-module.module';



// @NgModule({
//   declarations: [
//     MainDashboardComponent,
//     AdminDashboardComponent,
//     DashboardRepairsTableComponent
//   ],
//   imports: [
//     UtilModuleModule,
//     CommonModule,
//     RouterModule,
//     FormsModule,
//     FontAwesomeModule,
//     ReactiveFormsModule,
//     MatAutocompleteModule,
//     MatButtonModule,
//     MatDatepickerModule,
//     MatFormFieldModule,
//     MatIconModule,
//     MatNativeDateModule,
//     MatOptionModule,
//     MatPaginatorModule,
//     MatProgressSpinnerModule,
//     MatRadioModule,
//     MatSelectModule,
//     MatSortModule,
//     MatTableModule,
//     MatTabsModule,
//     BrowserAnimationsModule,
//     FontAwesomeModule,
//     NgbModule,
//   ]
// })
// export class DashboardModule { }

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
  ]
})
export class DashboardModule { }