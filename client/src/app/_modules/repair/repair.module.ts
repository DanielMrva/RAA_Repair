import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatRadioModule } from '@angular/material/radio';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';

import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';


// import { MatSelectModule } from '@angular/material/select';
// import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
// import { MatFormFieldModule } from '@angular/material/form-field';

import { AddRepairComponent } from './components/add-repair/add-repair.component';
import { OneRepairComponent } from './components/one-repair/one-repair.component';
import { EditRepairComponent } from './components/edit-repair/edit-repair.component';
import { AdminAddRepairComponent } from './components/add-repair/admin-add-repair/admin-add-repair.component';

import { OrgLocationSelectorComponent } from '@app/_components/utilComponents/org-location-selector/org-location-selector.component';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { RepairEffects } from '@app/_store/_repair-store/repair.effects';
import { repairReducer } from '@app/_store/_repair-store/repair.reducers';
import { AdminEditRepairComponent } from './components/edit-repair/admin-edit-repair/admin-edit-repair.component';




@NgModule({
  declarations: [
    AddRepairComponent,
    OneRepairComponent,
    EditRepairComponent,
    AdminAddRepairComponent,
    AdminEditRepairComponent,
    OrgLocationSelectorComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    MatIconModule,
    MatDialogModule,
    // BrowserAnimationsModule,
    MatRadioModule,
    // MatSelectModule,
    // MatProgressSpinnerModule,
    // MatFormFieldModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    NgbAccordionModule,
    StoreModule.forFeature('repair', repairReducer),
    EffectsModule.forFeature([RepairEffects])
  ]
})
export class RepairModule { }
