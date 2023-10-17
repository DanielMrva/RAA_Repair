import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatRadioModule } from '@angular/material/radio';
// import { MatSelectModule } from '@angular/material/select';
// import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
// import { MatFormFieldModule } from '@angular/material/form-field';

import { AddRepairComponent } from './components/add-repair/add-repair.component';
import { OneRepairComponent } from './components/one-repair/one-repair.component';
import { EditRepairComponent } from './components/edit-repair/edit-repair.component';
import { AdminAddRepairComponent } from './components/add-repair/admin-add-repair/admin-add-repair.component';




@NgModule({
  declarations: [
    AddRepairComponent,
    OneRepairComponent,
    EditRepairComponent,
    AdminAddRepairComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    // BrowserAnimationsModule,
    MatRadioModule,
    // MatSelectModule,
    // MatProgressSpinnerModule,
    // MatFormFieldModule
  ]
})
export class RepairModule { }
