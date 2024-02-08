import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';


// import { MatDatepickerModule } from '@angular/material/datepicker';
// import { MatInputModule } from '@angular/material/input';
// import { MatNativeDateModule } from '@angular/material/core';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatAutocompleteModule} from '@angular/material/autocomplete';

import { EditUserComponent } from './components/edit-user/edit-user.component';
import { OneUserComponent } from './components/one-user/one-user.component';
import { AddUserComponent } from './components/add-user/add-user.component';
import { LoginComponent } from './components/login/login.component';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from '@app/_store/_user-store/user.effects';
import { userReducer } from '@app/_store/_user-store/user.reducers';
import { authReducer } from '@app/_store/_auth-store/auth.reducers';



@NgModule({
  declarations: [
    EditUserComponent,
    OneUserComponent,
    AddUserComponent,
    LoginComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    // MatDatepickerModule,
    // MatInputModule,
    // MatNativeDateModule,
    // BrowserAnimationsModule,
    // MatRadioModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatAutocompleteModule,
    StoreModule.forFeature('user', userReducer),
    StoreModule.forFeature('auth', authReducer),
    EffectsModule.forFeature([UserEffects]),
  ]
})
export class UserModule { }
