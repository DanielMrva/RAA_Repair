import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatError } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';

import { OneOrgComponent } from './components/one-org/one-org.component';
import { EditOrgComponent } from './components/edit-org/edit-org.component';
import { AddOrgComponent } from './components/add-org/add-org.component';
import { DeleteDocumentButtonComponent } from '@app/_components/utilComponents/delete-document-button/delete-document-button.component';

import { StoreModule } from '@ngrx/store';
import { orgReducer } from '@app/_store/_org-store/org.reducers';
import { EffectsModule } from '@ngrx/effects';
import { OrgEffects } from '@app/_store/_org-store/org.effects';
import { OrgResultsTableComponent } from './components/org-results-table/org-results-table.component';
import { OrgResultsPageComponent } from './components/org-results-page/org-results-page.component';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    OneOrgComponent,
    EditOrgComponent,
    AddOrgComponent,
    OrgResultsTableComponent,
    OrgResultsPageComponent,
    DeleteDocumentButtonComponent
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
    StoreModule.forFeature('org', orgReducer),
    EffectsModule.forFeature([OrgEffects])
  ]
})
export class OrgModule { }

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

// import { OneOrgComponent } from './components/one-org/one-org.component';
// import { EditOrgComponent } from './components/edit-org/edit-org.component';
// import { AddOrgComponent } from './components/add-org/add-org.component';
// import { StoreModule } from '@ngrx/store';
// import { orgReducer } from '@app/_store/_org-store/org.reducers';
// import { EffectsModule } from '@ngrx/effects';
// import { OrgEffects } from '@app/_store/_org-store/org.effects';
// import { OrgResultsTableComponent } from './components/org-results-table/org-results-table.component';
// import { OrgResultsPageComponent } from './components/org-results-page/org-results-page.component';
// import { UtilModuleModule } from '../util-module/util-module.module';