import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatIconModule } from '@angular/material/icon';

import { DeletionModalComponent } from './components/deletion-modal/deletion-modal.component';
import { DeletionButtonComponent } from './components/deletion-button/deletion-button.component';
import { ErrorDisplayComponent } from './components/error-display/error-display.component';
import { InvoiceTxtBtnComponent } from './components/invoice-txt-btn/invoice-txt-btn.component';
import { LocationMismatchModalComponent } from './components/location-mismatch-modal/location-mismatch-modal.component';
import { OrgLocSelectorComponent } from './components/org-loc-selector/org-loc-selector.component';
import { PoTxtBtnComponent } from './components/po-txt-btn/po-txt-btn.component';
import { OrgRadNavigatorComponent } from './components/org-rad-navigator/org-rad-navigator.component';
import { RadioSnMkNavigatorComponent } from './components/radio-sn-mk-navigator/radio-sn-mk-navigator.component';
import { RepairTagNavigatorComponent } from './components/repair-tag-navigator/repair-tag-navigator.component';
import { RepairStatDropdownComponent } from './components/repair-stat-dropdown/repair-stat-dropdown.component';
import { RouterModule } from '@angular/router';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';



@NgModule({
  declarations: [
    DeletionModalComponent,
    DeletionButtonComponent,
    ErrorDisplayComponent,
    InvoiceTxtBtnComponent,
    LocationMismatchModalComponent,
    OrgLocSelectorComponent,
    PoTxtBtnComponent,
    OrgRadNavigatorComponent,
    RadioSnMkNavigatorComponent,
    RepairTagNavigatorComponent,
    RepairStatDropdownComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatIconModule,
    RouterModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule
  ],
  exports: [
    DeletionModalComponent,
    DeletionButtonComponent,
    ErrorDisplayComponent,
    InvoiceTxtBtnComponent,
    LocationMismatchModalComponent,
    OrgLocSelectorComponent,
    PoTxtBtnComponent,
    OrgRadNavigatorComponent,
    RadioSnMkNavigatorComponent,
    RepairTagNavigatorComponent,
    RepairStatDropdownComponent
  ]
})
export class UtilityModule { }
