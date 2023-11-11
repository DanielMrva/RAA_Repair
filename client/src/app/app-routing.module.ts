import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


// component imports
import { HomeComponent } from '@app/components/home/home.component';
import { AdminRadioReportsComponent } from '@app/components/admin-radio-reports/admin-radio-reports.component';
import { AdminUserReportsComponent } from '@app/components/admin-user-reports/admin-user-reports.component';
import { AdminOrgReportsComponent } from '@app/components/admin-org-reports/admin-org-reports.component';
import { DashboardComponent } from '@app/components/dashboard/dashboard.component';


import { AddRepairComponent } from './_modules/repair/components/add-repair/add-repair.component';
import { AdminAddRepairComponent } from './_modules/repair/components/add-repair/admin-add-repair/admin-add-repair.component';
import { AddRadioComponent } from './_modules/radio/components/add-radio/add-radio/add-radio.component';
import { OneRadioComponent } from './_modules/radio/components/one-radio/one-radio.component';
import { OneRepairComponent } from './_modules/repair/components/one-repair/one-repair.component';
import { EditRepairComponent } from './_modules/repair/components/edit-repair/edit-repair.component';
import { EditRadioComponent } from './_modules/radio/components/edit-radio/edit-radio.component';
import { EditUserComponent } from './_modules/user/components/edit-user/edit-user.component';
import { EditOrgComponent } from './_modules/org/components/edit-org/edit-org.component';
import { OneUserComponent } from './_modules/user/components/one-user/one-user.component';
import { OneOrgComponent } from './_modules/org/components/one-org/one-org.component';
import { AddOrgComponent } from './_modules/org/components/add-org/add-org.component';
import { AddUserComponent } from './_modules/user/components/add-user/add-user.component';
import { LoginComponent } from './_modules/user/components/login/login.component';

import { roleGuard } from './guards/role-guard';
import { authGuard } from './guards/auth-guard';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full'
  },
  {
    path: 'submit',
    component: AddRepairComponent,
    pathMatch: 'full',
    data: {
      role: ['admin', 'user']
    },
    canActivate: [authGuard, roleGuard]
  },
  {
    path: 'submit/:serialNumber?',
    component: AdminAddRepairComponent,
    pathMatch: 'full',
    data: {
      role: ['admin', 'user']
    },
    canActivate: [authGuard, roleGuard]
  },
  {
    path: 'add-radio',
    component: AddRadioComponent,
    pathMatch: 'full',
    data: {
      role: ['admin']
    },
    canActivate: [authGuard, roleGuard]
  },
  {
    path: 'add-user',
    component: AddUserComponent,
    pathMatch: 'full',
    data: {
      role: ['admin']
    },
    canActivate: [authGuard, roleGuard]
  },
  {
    path: 'add-org',
    component: AddOrgComponent,
    pathMatch: 'full',
    data: {
      role: ['admin']
    },
    canActivate: [authGuard, roleGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
    pathMatch: 'full'
  },
  {
    path: 'one-repair/:id',
    component: OneRepairComponent,
    data: {
      role: ['admin', 'user']
    },
    canActivate: [authGuard]
  },
  {
    path: 'one-radio/:id',
    component: OneRadioComponent,
    data: {
      role: ['admin', 'user']
    },
    canActivate: [authGuard]
  },
  {
    path: 'one-user/:id',
    component: OneUserComponent,
    data: {
      role: ['admin', 'user']
    },
    canActivate: [authGuard]
  },
  {
    path: 'one-org/:id',
    component: OneOrgComponent,
    data: {
      role: ['admin', 'user']
    },
    canActivate: [authGuard, roleGuard]
  },
  {
    path: 'org-radio/:orgName',
    component: AdminRadioReportsComponent,
    pathMatch: 'full',
    runGuardsAndResolvers: 'always',
    data: {
      role: ['admin']
    },
    canActivate: [authGuard, roleGuard]
  },  
  {
    path: 'user-reports',
    component: AdminUserReportsComponent,
    data: {
      role: ['admin']
    },
    canActivate: [authGuard, roleGuard]
  },
  {
    path: 'org-reports',
    component: AdminOrgReportsComponent,
    outlet: 'dashboard',
    data: {
      role: ['admin']
    },
    canActivate: [authGuard, roleGuard]
  },
  {
    path: 'edit-repair/:id',
    component: EditRepairComponent,
    pathMatch: 'full',
    data: {
      role: ['admin']
    },
    canActivate: [authGuard, roleGuard]
  },
  {
    path: 'edit-radio/:id',
    component: EditRadioComponent,
    pathMatch: 'full',
    data: {
      role: ['admin']
    },
    canActivate: [authGuard, roleGuard]
  },  
  {
    path: 'edit-user/:id',
    component: EditUserComponent,
    pathMatch: 'full',
    data: {
      role: ['admin']
    },
    canActivate: [authGuard, roleGuard]
  },
  {
    path: 'edit-org/:id',
    component: EditOrgComponent,
    pathMatch: 'full',
    data: {
      role: ['admin']
    },
    canActivate: [authGuard, roleGuard]
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    pathMatch: 'full',
    data: {
      role: ['admin', 'user', 'tech']
    },
    canActivate: [authGuard, roleGuard]
  },
  {
    path: '**',
    redirectTo: '',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
