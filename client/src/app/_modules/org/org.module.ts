import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// import { MatDatepickerModule } from '@angular/material/datepicker';
// import { MatInputModule } from '@angular/material/input';
// import { MatNativeDateModule } from '@angular/material/core';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { MatRadioModule } from '@angular/material/radio';
// import { MatSelectModule } from '@angular/material/select';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatError } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';

import { OneOrgComponent } from './components/one-org/one-org.component';
import { EditOrgComponent } from './components/edit-org/edit-org.component';
import { AddOrgComponent } from './components/add-org/add-org.component';
import { StoreModule } from '@ngrx/store';
import { orgReducer } from '@app/_store/_org-store/org.reducers';
import { EffectsModule } from '@ngrx/effects';
import { OrgEffects } from '@app/_store/_org-store/org.effects';
import { OrgResultsTableComponent } from './components/org-results-table/org-results-table.component';



@NgModule({
  declarations: [
    OneOrgComponent,
    EditOrgComponent,
    AddOrgComponent,
    OrgResultsTableComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatTableModule,
    StoreModule.forFeature('org', orgReducer),
    EffectsModule.forFeature([OrgEffects])
  ]
})
export class OrgModule { }
