import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


// component imports
import { HomeComponent } from '@app/components/home/home.component';
import { LoginComponent } from '@app/components/login/login.component';
// import { SubmitServiceComponent } from '@app/components/submit-service/submit-service.component';
// import { OneRepairComponent } from '@app/components/one-repair/one-repair.component';
// import { AddRadioComponent } from '@app/components/add-radio/add-radio.component';
// import { OneRadioComponent } from '@app/components/one-radio/one-radio.component';
// import { AdminRadioComponent } from '@app/components/add-radio/admin-radio/admin-radio.component';
import { AdminRadioReportsComponent } from '@app/components/admin-radio-reports/admin-radio-reports.component';
import { AdminUserReportsComponent } from '@app/components/admin-user-reports/admin-user-reports.component';
// import { EditRadioComponent } from '@app/components/edits/edit-radio/edit-radio.component';
// import { EditRepairComponent } from '@app/components/edits/edit-repair/edit-repair.component';
// import { EditUserComponent } from '@app/components/edits/edit-user/edit-user.component';
// import { OneUserComponent } from '@app/components/one-user/one-user.component';
// import { EditOrganizationComponent } from '@app/components/edits/edit-organization/edit-organization.component';
// import { OneOrganizationComponent } from '@app/components/one-organization/one-organization.component';
import { AdminOrgReportsComponent } from '@app/components/admin-org-reports/admin-org-reports.component';
import { DashboardComponent } from '@app/components/dashboard/dashboard.component';
// import { AdminAddRadioComponent } from './_modules/radio/components/add-radio/add-radio/admin-add-radio/admin-add-radio.component';


import { AddRepairComponent } from './_modules/repair/components/add-repair/add-repair.component';
import { AdminAddRepairComponent } from './_modules/repair/components/add-repair/admin-add-repair/admin-add-repair.component';
import { AddRadioComponent } from './_modules/radio/components/add-radio/add-radio/add-radio.component';
import { OneRadioComponent } from './_modules/radio/components/one-radio/one-radio.component';
import { OneRepairComponent } from './_modules/repair/components/one-repair/one-repair.component';
import { EditRepairComponent } from './_modules/repair/components/edit-repair/edit-repair.component';
import { EditRadioComponent } from './_modules/radio/components/edit-radio/edit-radio.component';
import { EditUserComponent } from './_modules/user/components/edit-user/edit-user.component';
import { EditOrgComponent } from './_modules/org/components/edit-org/edit-org.component';
import { OneUserComponent } from './components/one-user/one-user.component';
import { OneOrgComponent } from './_modules/org/components/one-org/one-org.component';
import { AddOrgComponent } from './_modules/org/components/add-org/add-org.component';
import { AddUserComponent } from './_modules/user/components/add-user/add-user.component';


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
    }
  },
  {
    path: 'submit/:serialNumber?',
    component: AdminAddRepairComponent,
    pathMatch: 'full',
    data: {
      role: ['admin', 'user']
    }
  },
  // {
  //   path: 'submit',
  //   component: SubmitServiceComponent,
  //   pathMatch: 'full',
  //   data: {
  //     role: ['admin', 'user']
  //   }
  // },
  // {
  //   path: 'submit/:serialNumber?',
  //   component: SubmitServiceComponent,
  //   pathMatch: 'full',
  //   data: {
  //     role: ['admin', 'user']
  //   }
  // },
  {
    path: 'add-radio',
    component: AddRadioComponent,
    pathMatch: 'full',
    data: {
      role: ['admin']
    }
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
    }
  },
  {
    path: 'one-radio/:id',
    component: OneRadioComponent,
    data: {
      role: ['admin', 'user']
    }
  },
  {
    path: 'one-user/:id',
    component: OneUserComponent,
    data: {
      role: ['admin', 'user']
    }
  },
  // {
  //   path: 'one-org/:id',
  //   component: OneOrganizationComponent,
  //   data: {
  //     role: ['admin', 'user']
  //   }
  // },
  {
    path: 'one-org/:id',
    component: OneOrgComponent,
    data: {
      role: ['admin', 'user']
    }
  },
  {
    path: 'org-radio/:orgName',
    component: AdminRadioReportsComponent,
    pathMatch: 'full',
    runGuardsAndResolvers: 'always',
    data: {
      role: ['admin']
    }
  },  
  {
    path: 'user-reports',
    component: AdminUserReportsComponent,
    data: {
      role: ['admin']
    }
  },
  {
    path: 'org-reports',
    component: AdminOrgReportsComponent,
    outlet: 'dashboard',
    data: {
      role: ['admin']
    }
  },
  {
    path: 'edit-repair/:id',
    component: EditRepairComponent,
    pathMatch: 'full',
    data: {
      role: ['admin']
    }
  },
  {
    path: 'edit-radio/:id',
    component: EditRadioComponent,
    pathMatch: 'full',
    data: {
      role: ['admin']
    }
  },  
  {
    path: 'edit-user/:id',
    component: EditUserComponent,
    pathMatch: 'full',
    data: {
      role: ['admin']
    }
  },
  {
    path: 'edit-org/:id',
    component: EditOrgComponent,
    pathMatch: 'full',
    data: {
      role: ['admin']
    }
  },
  // {
  //   path: 'edit-org/:id',
  //   component: EditOrganizationComponent,
  //   pathMatch: 'full',
  //   data: {
  //     role: ['admin']
  //   }
  // },
  {
    path: 'dashboard',
    component: DashboardComponent,
    pathMatch: 'full',
    data: {
      role: ['admin', 'user', 'tech']
    }
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
