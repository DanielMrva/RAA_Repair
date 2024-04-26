import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '@app/app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HeaderComponent } from './header/header.component';
import { AdminNavComponent } from './admin-nav/admin-nav.component';
import { UserNavComponent } from './user-nav/user-nav.component';
import { TechNavComponent } from './tech-nav/tech-nav.component';
import { OrgRadiosNavigatorComponent } from '@app/_components/utilComponents/org-radios-navigator/org-radios-navigator.component';
import { RadioSnMNkNavigatorComponent } from '@app/_components/utilComponents/radio-sn-mnk-navigator/radio-sn-mnk-navigator.component';
import { AuthService } from '@app/services/auth/auth.service';

import { StoreModule } from '@ngrx/store';
import { authReducer } from '@app/_store/_auth-store/auth.reducers';

@NgModule({
  declarations: [
    HeaderComponent,
    AdminNavComponent,
    UserNavComponent,
    TechNavComponent,
    OrgRadiosNavigatorComponent,
    RadioSnMNkNavigatorComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forFeature('auth', authReducer)
  ],
  exports: [
    HeaderComponent
  ],
  providers: [
    AuthService
  ]
})
export class NavModule { }
