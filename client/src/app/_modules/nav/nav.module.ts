

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
import { RepairByTagNavigatorComponent } from '@app/_components/utilComponents/repair-by-tag-navigator/repair-by-tag-navigator.component';
import { AuthService } from '@app/services/auth/auth.service';

import { StoreModule } from '@ngrx/store';
import { authReducer } from '@app/_store/_auth-store/auth.reducers';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { UtilityModule } from '../utility/utility.module';

@NgModule({
  declarations: [
    HeaderComponent,
    AdminNavComponent,
    UserNavComponent,
    TechNavComponent,
    OrgRadiosNavigatorComponent,
    RadioSnMNkNavigatorComponent,
    RepairByTagNavigatorComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    // MatFormFieldModule,
    // MatInputModule,
    UtilityModule,
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

// import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { AppRoutingModule } from '@app/app-routing.module';

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

// import { HeaderComponent } from './header/header.component';
// import { AdminNavComponent } from './admin-nav/admin-nav.component';
// import { UserNavComponent } from './user-nav/user-nav.component';
// import { TechNavComponent } from './tech-nav/tech-nav.component';
// import { AuthService } from '@app/services/auth/auth.service';

// import { StoreModule } from '@ngrx/store';
// import { authReducer } from '@app/_store/_auth-store/auth.reducers';
// import { UtilModuleModule } from '../util-module/util-module.module';