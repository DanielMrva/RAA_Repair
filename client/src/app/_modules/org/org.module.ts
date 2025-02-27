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
import { OrgResultsTableComponent } from './components/org-results-table/org-results-table.component';
import { OrgResultsPageComponent } from './components/org-results-page/org-results-page.component';
import { DeleteDocumentButtonComponent } from '@app/_components/utilComponents/delete-document-button/delete-document-button.component';

import { StoreModule } from '@ngrx/store';
import { orgReducer } from '@app/_store/_org-store/org.reducers';
import { EffectsModule } from '@ngrx/effects';
import { OrgEffects } from '@app/_store/_org-store/org.effects';

import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UtilityModule } from '../utility/utility.module';
import { MatBadgeModule } from '@angular/material/badge';

@NgModule({
  declarations: [
    OneOrgComponent,
    EditOrgComponent,
    AddOrgComponent,
    OrgResultsTableComponent,
    OrgResultsPageComponent,
    DeleteDocumentButtonComponent,
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
    MatBadgeModule,
    StoreModule.forFeature('org', orgReducer),
    EffectsModule.forFeature([OrgEffects]),
    UtilityModule
  ]
})
export class OrgModule { }