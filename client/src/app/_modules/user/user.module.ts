// import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';

// import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { RouterModule } from '@angular/router';

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

// import { EditUserComponent } from './components/edit-user/edit-user.component';
// import { OneUserComponent } from './components/one-user/one-user.component';
// import { AddUserComponent } from './components/add-user/add-user.component';
// import { LoginComponent } from './components/login/login.component';

// import { StoreModule } from '@ngrx/store';
// import { EffectsModule } from '@ngrx/effects';
// import { UserEffects } from '@app/_store/_user-store/user.effects';
// import { userReducer } from '@app/_store/_user-store/user.reducers';
// import { authReducer } from '@app/_store/_auth-store/auth.reducers';
// import { UserResultsTableComponent } from './components/user-results-table/user-results-table.component';
// import { UserResultsPageComponent } from './components/user-results-page/user-results-page.component';
// import { UtilModuleModule } from '../util-module/util-module.module';


// @NgModule({
//   declarations: [
//     EditUserComponent,
//     OneUserComponent,
//     AddUserComponent,
//     LoginComponent,
//     UserResultsTableComponent,
//     UserResultsPageComponent,
//   ],
//   imports: [
//     UtilModuleModule,
//     CommonModule,
//     RouterModule,
//     FormsModule,
//     FontAwesomeModule,
//     ReactiveFormsModule,
//     MatAutocompleteModule,
//     MatButtonModule,
//     MatDatepickerModule,
//     MatFormFieldModule,
//     MatIconModule,
//     MatNativeDateModule,
//     MatOptionModule,
//     MatPaginatorModule,
//     MatProgressSpinnerModule,
//     MatRadioModule,
//     MatSelectModule,
//     MatSortModule,
//     MatTableModule,
//     MatTabsModule,
//     BrowserAnimationsModule,
//     FontAwesomeModule,
//     NgbModule,

//     StoreModule.forFeature('user', userReducer),
//     StoreModule.forFeature('auth', authReducer),
//     EffectsModule.forFeature([UserEffects]),
//   ]
// })
// export class UserModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';

import { EditUserComponent } from './components/edit-user/edit-user.component';
import { OneUserComponent } from './components/one-user/one-user.component';
import { AddUserComponent } from './components/add-user/add-user.component';
import { LoginComponent } from './components/login/login.component';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from '@app/_store/_user-store/user.effects';
import { userReducer } from '@app/_store/_user-store/user.reducers';
import { authReducer } from '@app/_store/_auth-store/auth.reducers';
import { UserResultsTableComponent } from './components/user-results-table/user-results-table.component';
import { UserResultsPageComponent } from './components/user-results-page/user-results-page.component';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    EditUserComponent,
    OneUserComponent,
    AddUserComponent,
    LoginComponent,
    UserResultsTableComponent,
    UserResultsPageComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatIconModule,
    MatSortModule,
    MatPaginatorModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatProgressSpinnerModule,
    MatAutocompleteModule,
    StoreModule.forFeature('user', userReducer),
    StoreModule.forFeature('auth', authReducer),
    EffectsModule.forFeature([UserEffects]),
  ]
})
export class UserModule { }