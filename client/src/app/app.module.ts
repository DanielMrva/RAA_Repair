import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { GraphQLModule } from './graphql/graphql.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Services and Modules
import { AuthService } from './services/auth.service';
// import { RoleGuard } from './guards/role-guard';
import { AppRoutingModule } from './app-routing.module';

// Components
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { SubmitServiceComponent } from './components/submit-service/submit-service.component';
import { AdminSubmitComponent } from './components/submit-service/admin-submit/admin-submit.component';
import { OneRepairComponent } from './components/one-repair/one-repair.component';
import { ToastComponent } from './components/toast/toast.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AddRadioComponent } from './components/add-radio/add-radio.component';
import { AdminRadioComponent } from './components/add-radio/admin-radio/admin-radio.component';
import { OneRadioComponent } from './components/one-radio/one-radio.component';
import { DataTableComponent } from './components/data-table/data-table.component';
import { AdminRadioReportsComponent } from './components/admin-radio-reports/admin-radio-reports.component';
import { NotesTemplateComponent } from './components/data-table/data-table-templates/notes-template/notes-template.component';
import { ServiceRecordTemplateComponent } from './components/data-table/data-table-templates/service-record-template/service-record-template.component';



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
    DataTableComponent,
    AdminRadioReportsComponent,
    NotesTemplateComponent,
    ServiceRecordTemplateComponent,
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
