// External Modules
import { NgModule, isDevMode } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { GraphQLModule } from '@app/graphql/graphql.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

// APP Modules and Services

import { AppRoutingModule } from '@app/app-routing.module';
import { AuthService } from '@app/services/auth/auth.service';
import { TableModule } from '@app/modules/tableModule/table/table.module';
import { NavModule } from '@app/_modules/nav/nav.module';





// Components
import { AppComponent } from '@app/app.component';
import { LoginComponent } from '@app/components/login/login.component';
import { HomeComponent } from '@app/components/home/home.component';
import { SubmitServiceComponent } from '@app/components/submit-service/submit-service.component';
import { AdminSubmitComponent } from '@app/components/submit-service/admin-submit/admin-submit.component';
import { OneRepairComponent } from '@app/components/one-repair/one-repair.component';
import { ToastComponent } from '@app/components/toast/toast.component';
import { AddRadioComponent } from '@app/components/add-radio/add-radio.component';
import { AdminRadioComponent } from '@app/components/add-radio/admin-radio/admin-radio.component';
import { OneRadioComponent } from '@app/components/one-radio/one-radio.component';
import { AdminRadioReportsComponent } from '@app/components/admin-radio-reports/admin-radio-reports.component';
import { EditRepairComponent } from './components/edits/edit-repair/edit-repair.component';
import { EditUserComponent } from './components/edits/edit-user/edit-user.component';
import { EditRadioComponent } from './components/edits/edit-radio/edit-radio.component';
import { EditOrganizationComponent } from './components/edits/edit-organization/edit-organization.component';
import { OneUserComponent } from './components/one-user/one-user.component';
import { OneOrganizationComponent } from './components/one-organization/one-organization.component';
import { AdminUserReportsComponent } from './components/admin-user-reports/admin-user-reports.component';
import { AdminOrgReportsComponent } from './components/admin-org-reports/admin-org-reports.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AdminDashboardComponent } from './components/dashboard/dashboards/admin-dashboard/admin-dashboard.component';
import { UserDashboardComponent } from './components/dashboard/dashboards/user-dashboard/user-dashboard.component';
import { TechDashboardComponent } from './components/dashboard/dashboards/tech-dashboard/tech-dashboard.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';




@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    SubmitServiceComponent,
    AdminSubmitComponent,
    OneRepairComponent,
    AddRadioComponent,
    AdminRadioComponent,
    OneRadioComponent,
    AdminRadioReportsComponent,
    EditRepairComponent,
    EditUserComponent,
    EditRadioComponent,
    EditOrganizationComponent,
    OneUserComponent,
    OneOrganizationComponent,
    AdminUserReportsComponent,
    AdminOrgReportsComponent,
    DashboardComponent,
    AdminDashboardComponent,
    UserDashboardComponent,
    TechDashboardComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule,
    FontAwesomeModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    GraphQLModule,
    NgbModule,
    ToastComponent, 
    TableModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    BrowserAnimationsModule,
    MatRadioModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    NavModule,
    StoreModule.forRoot({}, {}),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() })
  ],
  providers: [ AuthService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
