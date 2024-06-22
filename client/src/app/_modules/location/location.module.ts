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
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';

import { AddLocationComponent } from './components/add-location/add-location.component';
import { EditLocationComponent } from './components/edit-location/edit-location.component';
import { OneLocationComponent } from './components/one-location/one-location.component';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { LocationEffects } from '@app/_store/_location-store/location.effects';
import { locationReducer } from '@app/_store/_location-store/location.reducers';
import { LocationResultsTableComponent } from './components/location-results-table/location-results-table.component';
import { LocationResultsPageComponent } from './components/location-results-page/location-results-page.component';

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
    MatTableModule,
    MatSortModule,
    MatIconModule,
    MatPaginatorModule,
    StoreModule.forFeature('location', locationReducer),
    EffectsModule.forFeature([LocationEffects])
  ],
  declarations: [
    AddLocationComponent,
    EditLocationComponent,
    OneLocationComponent,
    LocationResultsTableComponent,
    LocationResultsPageComponent,
  ]
})
export class LocationModule { }
