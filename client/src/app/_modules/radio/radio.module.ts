import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { AddRadioComponent } from './components/add-radio/add-radio/add-radio.component';
import { AdminAddRadioComponent } from './components/add-radio/add-radio/admin-add-radio/admin-add-radio.component';
import { OneRadioComponent } from './components/one-radio/one-radio.component';
import { EditRadioComponent } from './components/edit-radio/edit-radio.component';



@NgModule({
  declarations: [
    AddRadioComponent,
    AdminAddRadioComponent,
    OneRadioComponent,
    EditRadioComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    BrowserAnimationsModule,
    MatRadioModule,
    MatSelectModule,
    MatProgressSpinnerModule,
  ]
})
export class RadioModule { }
