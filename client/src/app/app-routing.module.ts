import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { RoleGuard } from '@app/guards/role-guard';


// component imports
import { HomeComponent } from '@app/components/home/home.component';
import { LoginComponent } from '@app/components/login/login.component';
import { SubmitServiceComponent } from '@app/components/submit-service/submit-service.component';
import { OneRepairComponent } from './components/one-repair/one-repair.component';

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
    // canActivate: [RoleGuard],
    data: {
      role: ['admin', 'user']
    }
  },
  {
    path: 'login',
    component: LoginComponent,
    pathMatch: 'full'
  },
  {
    path: 'one-repair/:id',
    component: OneRepairComponent
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
