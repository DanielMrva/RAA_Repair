import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { GraphQLModule } from '@app/graphql/graphql.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Services and Modules
import { AuthService } from '@app/services/auth/auth.service';
// import { RoleGuard } from './guards/role-guard';
import { AppRoutingModule } from '@app/app-routing.module';

// Components
import { AppComponent } from '@app/app.component';
import { LoginComponent } from '@app/components/login/login.component';
import { HeaderComponent } from '@app/components/header/header.component';
import { HomeComponent } from '@app/components/home/home.component';
import { SubmitServiceComponent } from '@app/components/submit-service/submit-service.component';
import { AdminSubmitComponent } from '@app/components/submit-service/admin-submit/admin-submit.component';
import { OneRepairComponent } from '@app/components/one-repair/one-repair.component';
import { ToastComponent } from '@app/components/toast/toast.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AddRadioComponent } from '@app/components/add-radio/add-radio.component';
import { AdminRadioComponent } from '@app/components/add-radio/admin-radio/admin-radio.component';
import { OneRadioComponent } from '@app/components/one-radio/one-radio.component';
// import { DataTableComponent } from '@app/components/data-table/data-table.component';
import { AdminRadioReportsComponent } from '@app/components/admin-radio-reports/admin-radio-reports.component';
import { NotesTemplateComponent } from '@app/components/data-table/data-table-templates/notes-template/notes-template.component';
import { ServiceRecordTemplateComponent } from '@app/components/data-table/data-table-templates/service-record-template/service-record-template.component';
import { UserTableComponent } from '@app/components/tables/user-table/user-table.component';
import { OrgTableComponent } from '@app/components/tables/org-table/org-table.component';
import { RadioTableComponent } from '@app/components/tables/radio-table/radio-table.component';
import { RepairTableComponent } from '@app/components/tables/repair-table/repair-table.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    HeaderComponent,
    SubmitServiceComponent,
    AdminSubmitComponent,
    OneRepairComponent,
    AddRadioComponent,
    AdminRadioComponent,
    OneRadioComponent,
    // DataTableComponent,
    AdminRadioReportsComponent,
    NotesTemplateComponent,
    ServiceRecordTemplateComponent,
    // UserTableComponent,
    // OrgTableComponent,
    // RadioTableComponent,
    // RepairTableComponent,
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    GraphQLModule,
    NgbModule,
    ToastComponent
  ],
  providers: [ AuthService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }



// // Components 
// import { AppComponent } from './app.component';
// import { HomeComponent } from './component/home';
// import { LoginComponent } from './component/login';
// import { HeaderComponent } from './component/header';

// // Modules and Services
// import { Authenication } from './_services';
// import { AppRoutingModule } from './app-routing.module';
