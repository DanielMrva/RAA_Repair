import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { AddLocationComponent } from './components/add-location/add-location.component';
import { EditLocationComponent } from './components/edit-location/edit-location.component';
import { OneLocationComponent } from './components/one-location/one-location.component';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { LocationEffects } from '@app/_store/_location-store/location.effects';
import { locationReducer } from '@app/_store/_location-store/location.reducers';



@NgModule({
  declarations: [
    AddLocationComponent,
    EditLocationComponent,
    OneLocationComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    StoreModule.forFeature('location', locationReducer),
    EffectsModule.forFeature([LocationEffects])
  ]
})
export class LocationModule { }
