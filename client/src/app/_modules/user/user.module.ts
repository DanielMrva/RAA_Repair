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
    MatTableModule,
    MatIconModule,
    MatSortModule,
    MatPaginatorModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatAutocompleteModule,
    StoreModule.forFeature('user', userReducer),
    StoreModule.forFeature('auth', authReducer),
    EffectsModule.forFeature([UserEffects]),
  ]
})
export class UserModule { }
