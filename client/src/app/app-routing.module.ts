import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


// component imports
import { HomeComponent } from '@app/components/home/home.component';
import { LoginComponent } from '@app/components/login/login.component';
import { SubmitServiceComponent } from '@app/components/submit-service/submit-service.component';
import { OneRepairComponent } from './components/one-repair/one-repair.component';
import { AddRadioComponent } from './components/add-radio/add-radio.component';
import { OneRadioComponent } from './components/one-radio/one-radio.component';
import { AdminRadioComponent } from './components/add-radio/admin-radio/admin-radio.component';
import { AdminRadioReportsComponent } from './components/admin-radio-reports/admin-radio-reports.component';
import { EditRadioComponent } from './components/edits/edit-radio/edit-radio.component';
import { EditRepairComponent } from './components/edits/edit-repair/edit-repair.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full'
  },
  {
    path: 'submit',
    component: SubmitServiceComponent,
    pathMatch: 'full',
    data: {
      role: ['admin', 'user']
    }
  },
  {
    path: 'submit/:serialNumber?',
    component: SubmitServiceComponent,
    pathMatch: 'full',
    data: {
      role: ['admin', 'user']
    }
  },
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
    path: 'org-radio/:orgName',
    component: AdminRadioReportsComponent,
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
    path: '**',
    redirectTo: '',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
