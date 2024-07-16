// import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';

// import { AddRepairComponent } from './components/add-repair/add-repair.component';
// import { OneRepairComponent } from './components/one-repair/one-repair.component';
// import { EditRepairComponent } from './components/edit-repair/edit-repair.component';
// import { AdminAddRepairComponent } from './components/add-repair/admin-add-repair/admin-add-repair.component';

// import { StoreModule } from '@ngrx/store';
// import { EffectsModule } from '@ngrx/effects';
// import { RepairEffects } from '@app/_store/_repair-store/repair.effects';
// import { repairReducer } from '@app/_store/_repair-store/repair.reducers';
// import { AdminEditRepairComponent } from './components/edit-repair/admin-edit-repair/admin-edit-repair.component';
// import { RepairResultsTableComponent } from './components/repair-results-table/repair-results-table.component';
// import { RepairResultsPageComponent } from './components/repair-results-page/repair-results-page.component';
// import { UtilModuleModule } from '../util-module/util-module.module';

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



// @NgModule({
//   declarations: [
//     AddRepairComponent,
//     OneRepairComponent,
//     EditRepairComponent,
//     AdminAddRepairComponent,
//     AdminEditRepairComponent,
//     RepairResultsTableComponent,
//     RepairResultsPageComponent,
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
//     StoreModule.forFeature('repair', repairReducer),
//     EffectsModule.forFeature([RepairEffects])
//   ]
// })
// export class RepairModule { }

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
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatDialogModule} from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';


import { MatSelectModule } from '@angular/material/select';
// import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
// import { MatFormFieldModule } from '@angular/material/form-field';

import { AddRepairComponent } from './components/add-repair/add-repair.component';
import { OneRepairComponent } from './components/one-repair/one-repair.component';
import { EditRepairComponent } from './components/edit-repair/edit-repair.component';
import { AdminAddRepairComponent } from './components/add-repair/admin-add-repair/admin-add-repair.component';

import { OrgLocationSelectorComponent } from '@app/_components/utilComponents/org-location-selector/org-location-selector.component';
import { PoTextButtonComponent } from '@app/_components/utilComponents/po-text-button/po-text-button.component';
import { InvoiceTextButtonComponent } from '@app/_components/utilComponents/invoice-text-button/invoice-text-button.component';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { RepairEffects } from '@app/_store/_repair-store/repair.effects';
import { repairReducer } from '@app/_store/_repair-store/repair.reducers';
import { AdminEditRepairComponent } from './components/edit-repair/admin-edit-repair/admin-edit-repair.component';
import { RepairResultsTableComponent } from './components/repair-results-table/repair-results-table.component';
import { RepairStatusDropdownComponent } from '@app/_components/utilComponents/repair-status-dropdown/repair-status-dropdown.component';
import { RepairResultsPageComponent } from './components/repair-results-page/repair-results-page.component';

@NgModule({
  declarations: [
    AddRepairComponent,
    OneRepairComponent,
    EditRepairComponent,
    AdminAddRepairComponent,
    AdminEditRepairComponent,
    OrgLocationSelectorComponent,
    PoTextButtonComponent,
    InvoiceTextButtonComponent,
    RepairResultsTableComponent,
    RepairStatusDropdownComponent,
    RepairResultsPageComponent,
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
    MatSelectModule,
    // MatProgressSpinnerModule,
    // MatFormFieldModule,
    MatPaginatorModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatTableModule,
    MatSortModule,
    NgbAccordionModule,
    NgbModalModule,
    StoreModule.forFeature('repair', repairReducer),
    EffectsModule.forFeature([RepairEffects])
  ]
})
export class RepairModule { }