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
import { MatSelectModule } from '@angular/material/select';
import { MatNativeDateModule } from '@angular/material/core';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppRoutingModule } from '@app/app-routing.module';

import { AuthService } from '@app/services/auth/auth.service';
import { NavModule } from '@app/_modules/nav/nav.module';
import { UserModule } from '@app/_modules/user/user.module';
import { OrgModule } from '@app/_modules/org/org.module';
import { RadioModule } from '@app/_modules/radio/radio.module';
import { RepairModule } from '@app/_modules/repair/repair.module';
import { LocationModule } from '@app/_modules/location/location.module';
import { DashboardModule } from './_modules/dashboard/dashboard.module';


import { AppComponent } from '@app/app.component';
import { HomeComponent } from '@app/components/home/home.component';

import { ToastComponent } from '@app/components/toast/toast.component';
import { AuthEffects } from '@app/_store/_auth-store/auth.effects';
import { LocationMismatchDialogComponent } from '@app/_components/utilComponents/location-mismatch-dialog/location-mismatch-dialog.component';
import { ErrorStatusDisplayComponent } from './_components/utilComponents/error-status-display/error-status-display.component';
import { MatInputModule } from '@angular/material/input';


@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        LocationMismatchDialogComponent,
        ErrorStatusDisplayComponent,
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
        // MatFormFieldModule,
        MatOptionModule,
        MatNativeDateModule,
        BrowserAnimationsModule,
        MatTabsModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatIconModule,
        MatButtonModule,
        MatSelectModule,
        MatProgressSpinnerModule,
        // MatInputModule,
        NavModule,
        UserModule,
        RadioModule,
        OrgModule,
        RepairModule,
        LocationModule,
        DashboardModule,
        ToastComponent,
        StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode()})
        
    ],
    providers: [ AuthService ],
    bootstrap: [ AppComponent ]
})
export class AppModule { }




// import { NgModule, isDevMode } from '@angular/core';
// import { RouterModule } from '@angular/router';
// import { BrowserModule } from '@angular/platform-browser';
// import { GraphQLModule } from '@app/graphql/graphql.module';
// import { HttpClientModule } from '@angular/common/http';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { StoreModule } from '@ngrx/store';
// import { EffectsModule } from '@ngrx/effects';
// import { StoreDevtoolsModule } from '@ngrx/store-devtools';

// import { AppRoutingModule } from '@app/app-routing.module';

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

// import { AuthService } from '@app/services/auth/auth.service';
// import { NavModule } from '@app/_modules/nav/nav.module';
// import { UserModule } from '@app/_modules/user/user.module';
// import { OrgModule } from '@app/_modules/org/org.module';
// import { RadioModule } from '@app/_modules/radio/radio.module';
// import { RepairModule } from '@app/_modules/repair/repair.module';
// import { LocationModule } from '@app/_modules/location/location.module';
// import { DashboardModule } from './_modules/dashboard/dashboard.module';
// import { UtilModuleModule } from './_modules/util-module/util-module.module';

// import { AppComponent } from '@app/app.component';
// import { HomeComponent } from '@app/components/home/home.component';

// import { ToastComponent } from '@app/components/toast/toast.component';
// import { AuthEffects } from '@app/_store/_auth-store/auth.effects';

// @NgModule({
//     declarations: [
//         AppComponent,
//         HomeComponent,
//     ],
//     imports: [
//         UtilModuleModule,
//         BrowserModule,
//         StoreModule.forRoot({}),
//         EffectsModule.forRoot([AuthEffects]),
//         RouterModule,
//         AppRoutingModule,
//         HttpClientModule,
//         FormsModule,
//         FontAwesomeModule,
//         ReactiveFormsModule,
//         GraphQLModule,
//         MatAutocompleteModule,
//         MatButtonModule,
//         MatDatepickerModule,
//         MatFormFieldModule,
//         MatIconModule,
//         MatNativeDateModule,
//         MatOptionModule,
//         MatPaginatorModule,
//         MatProgressSpinnerModule,
//         MatRadioModule,
//         MatSelectModule,
//         MatSortModule,
//         MatTableModule,
//         MatTabsModule,
//         BrowserAnimationsModule,
//         FontAwesomeModule,
//         NgbModule,
//         NavModule,
//         UserModule,
//         RadioModule,
//         OrgModule,
//         RepairModule,
//         LocationModule,
//         DashboardModule,
//         ToastComponent,
//         StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode()})
//     ],
//     providers: [ AuthService ],
//     bootstrap: [ AppComponent ]
// })
// export class AppModule { }

