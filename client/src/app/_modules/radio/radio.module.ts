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
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';

import { AddRadioComponent } from './components/add-radio/add-radio/add-radio.component';
import { AdminAddRadioComponent } from './components/add-radio/add-radio/admin-add-radio/admin-add-radio.component';
import { OneRadioComponent } from './components/one-radio/one-radio.component';
import { EditRadioComponent } from './components/edit-radio/edit-radio.component';
import { RadioResultsTableComponent } from './components/radio-results-table/radio-results-table.component';
import { DeleteRepairButtonComponent } from '@app/_components/utilComponents/delete-repair-button/delete-repair-button.component';
import { DeleteConfirmModalComponent } from '@app/_components/utilComponents/delete-confirm-modal/delete-confirm-modal.component';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { RadioEffects } from '@app/_store/_radio-store/radio.effects';
import { radioReducer } from '@app/_store/_radio-store/radio.reducers';
import { RadioResultsPageComponent } from './components/radio-results-page/radio-results-page.component';

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
    MatTableModule,
    MatSortModule,
    MatIconModule,
    MatPaginatorModule,
    StoreModule.forFeature('radio', radioReducer),
    EffectsModule.forFeature([RadioEffects])
  ],
  declarations: [
    AddRadioComponent,
    AdminAddRadioComponent,
    OneRadioComponent,
    EditRadioComponent,
    RadioResultsTableComponent,
    DeleteRepairButtonComponent,
    DeleteConfirmModalComponent,
    RadioResultsPageComponent,
  ],
})
export class RadioModule { }

// import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';

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

// import { AddRadioComponent } from './components/add-radio/add-radio/add-radio.component';
// import { AdminAddRadioComponent } from './components/add-radio/add-radio/admin-add-radio/admin-add-radio.component';
// import { OneRadioComponent } from './components/one-radio/one-radio.component';
// import { EditRadioComponent } from './components/edit-radio/edit-radio.component';
// import { RadioResultsTableComponent } from './components/radio-results-table/radio-results-table.component';

// import { StoreModule } from '@ngrx/store';
// import { EffectsModule } from '@ngrx/effects';
// import { RadioEffects } from '@app/_store/_radio-store/radio.effects';
// import { radioReducer } from '@app/_store/_radio-store/radio.reducers';
// import { RadioResultsPageComponent } from './components/radio-results-page/radio-results-page.component';
// import { UtilModuleModule } from '../util-module/util-module.module';
