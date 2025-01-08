import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
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

import { AddRepairComponent } from './components/add-repair/add-repair.component';
import { OneRepairComponent } from './components/one-repair/one-repair.component';
import { EditRepairComponent } from './components/edit-repair/edit-repair.component';

import { OrgLocationSelectorComponent } from '@app/_components/utilComponents/org-location-selector/org-location-selector.component';
import { PoTextButtonComponent } from '@app/_components/utilComponents/po-text-button/po-text-button.component';
import { InvoiceTextButtonComponent } from '@app/_components/utilComponents/invoice-text-button/invoice-text-button.component';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { RepairEffects } from '@app/_store/_repair-store/repair.effects';
import { repairReducer } from '@app/_store/_repair-store/repair.reducers';
import { RepairResultsTableComponent } from './components/repair-results-table/repair-results-table.component';
import { RepairStatusDropdownComponent } from '@app/_components/utilComponents/repair-status-dropdown/repair-status-dropdown.component';
import { RepairResultsPageComponent } from './components/repair-results-page/repair-results-page.component';
import { EditRepairFormComponent } from './components/edit-repair/edit-repair-form/edit-repair-form.component';
import { AddRepairFormComponent } from './components/add-repair/add-repair-form/add-repair-form.component';
import { UtilityModule } from '../utility/utility.module';

@NgModule({
  declarations: [
    AddRepairComponent,
    OneRepairComponent,
    EditRepairComponent,
    OrgLocationSelectorComponent,
    PoTextButtonComponent,
    InvoiceTextButtonComponent,
    RepairResultsTableComponent,
    RepairStatusDropdownComponent,
    RepairResultsPageComponent,
    EditRepairFormComponent,
    AddRepairFormComponent,
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
    MatRadioModule,
    MatSelectModule,
    MatPaginatorModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatTableModule,
    MatSortModule,
    NgbAccordionModule,
    NgbModalModule,
    UtilityModule,
    StoreModule.forFeature('repair', repairReducer),
    EffectsModule.forFeature([RepairEffects])
  ]
})
export class RepairModule { }