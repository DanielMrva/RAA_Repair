import { NgModule, isDevMode } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { GraphQLModule } from '@app/graphql/graphql.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOptionModule } from '@angular/material/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
// import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
// import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppRoutingModule } from '@app/app-routing.module';

import { AuthService } from '@app/services/auth/auth.service';
import { TableModule } from '@app/modules/tableModule/table/table.module';
import { NavModule } from '@app/_modules/nav/nav.module';
import { UserModule } from '@app/_modules/user/user.module';
import { OrgModule } from '@app/_modules/org/org.module';
import { RadioModule } from '@app/_modules/radio/radio.module';
import { RepairModule } from '@app/_modules/repair/repair.module';
import { LocationModule } from '@app/_modules/location/location.module';


import { AppComponent } from '@app/app.component';
// import { LoginComponent } from '@app/components/login/login.component';
import { HomeComponent } from '@app/components/home/home.component';
import { AdminOrgReportsComponent } from '@app/components/admin-org-reports/admin-org-reports.component';
import { AdminRadioReportsComponent } from '@app/components/admin-radio-reports/admin-radio-reports.component';
import { AdminUserReportsComponent } from '@app/components/admin-user-reports/admin-user-reports.component';


import { DashboardComponent } from '@app/components/dashboard/dashboard.component';
import { AdminDashboardComponent } from '@app/components/dashboard/dashboards/admin-dashboard/admin-dashboard.component';
import { UserDashboardComponent } from '@app/components/dashboard/dashboards/user-dashboard/user-dashboard.component';
import { TechDashboardComponent } from '@app/components/dashboard/dashboards/tech-dashboard/tech-dashboard.component';
import { ToastComponent } from '@app/components/toast/toast.component';
import { AuthEffects } from '@app/_store/_auth-store/auth.effects';
import { LocationMismatchDialogComponent } from '@app/_components/utilComponents/location-mismatch-dialog/location-mismatch-dialog.component';
// import { RepairStatusDropdownComponent } from '@app/_components/utilComponents/repair-status-dropdown/repair-status-dropdown.component';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        // LoginComponent,
        AdminOrgReportsComponent,
        AdminRadioReportsComponent,
        AdminUserReportsComponent,
        DashboardComponent,
        AdminDashboardComponent,
        UserDashboardComponent,
        TechDashboardComponent,
        LocationMismatchDialogComponent,
        // RepairStatusDropdownComponent,
        ],
    imports: [
        BrowserModule,
        StoreModule.forRoot({}),
        EffectsModule.forRoot([AuthEffects]),
        RouterModule,
        FontAwesomeModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        GraphQLModule,
        NgbModule,
        MatDatepickerModule,
        MatAutocompleteModule,
        MatFormFieldModule,
        MatOptionModule,
        // MatInputModule,
        MatNativeDateModule,
        BrowserAnimationsModule,
        // MatRadioModule,
        MatSelectModule,
        MatProgressSpinnerModule,
        NavModule,
        TableModule,
        UserModule,
        RadioModule,
        OrgModule,
        RepairModule,
        LocationModule,
        ToastComponent,
        StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode()})
        
    ],
    providers: [ AuthService ],
    bootstrap: [ AppComponent ]
})
export class AppModule { }



