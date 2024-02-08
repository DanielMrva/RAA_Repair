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
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatFormFieldModule} from '@angular/material/form-field';

import { AddRadioComponent } from './components/add-radio/add-radio/add-radio.component';
import { AdminAddRadioComponent } from './components/add-radio/add-radio/admin-add-radio/admin-add-radio.component';
import { OneRadioComponent } from './components/one-radio/one-radio.component';
import { EditRadioComponent } from './components/edit-radio/edit-radio.component';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { RadioEffects } from '@app/_store/_radio-store/radio.effects';
import { radioReducer } from '@app/_store/_radio-store/radio.reducers'



@NgModule({
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
    MatAutocompleteModule,
    MatFormFieldModule,
    StoreModule.forFeature('radio', radioReducer),
    EffectsModule.forFeature([RadioEffects])
  ],
  declarations: [
    AddRadioComponent,
    AdminAddRadioComponent,
    OneRadioComponent,
    EditRadioComponent,
  ],
})
export class RadioModule { }
