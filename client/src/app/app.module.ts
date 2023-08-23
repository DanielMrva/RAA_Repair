import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { GraphQLModule } from '@app/graphql/graphql.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Services and Modules
import { AuthService } from '@app/services/auth/auth.service';
import { AppRoutingModule } from '@app/app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TableModule } from '@app/modules/tableModule/table/table.module';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatRadioModule } from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations'



// Components
import { AppComponent } from '@app/app.component';
import { LoginComponent } from '@app/components/login/login.component';
import { HeaderComponent } from '@app/components/header/header.component';
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
    AdminRadioReportsComponent,
    EditRepairComponent,
    EditUserComponent,
    EditRadioComponent,
    EditOrganizationComponent,
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
    ToastComponent, 
    TableModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    BrowserAnimationsModule,
    MatRadioModule
  ],
  providers: [ AuthService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
