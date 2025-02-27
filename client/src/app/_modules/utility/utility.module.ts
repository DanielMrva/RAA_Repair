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
import { MatChipsModule } from '@angular/material/chips';
import { MatBadgeModule } from '@angular/material/badge';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CopyPartsBtnComponent } from './components/copy-parts-btn/copy-parts-btn.component';
import { PartSelectorDropdownComponent } from './components/part-selector/part-selector-dropdown/part-selector-dropdown.component';
import { StoreModule } from '@ngrx/store';
import { partReducer } from '@app/_store/_part-store/part.reducers';
import { EffectsModule } from '@ngrx/effects';
import { PartEffects } from '@app/_store/_part-store/part.effects';
import { IsAuthenticatedDirective } from '@app/_directives/is-authenticated.directive';
import { AccessLevelDirective } from '@app/_directives/access-level.directive';
import { AddPartModalFormComponent } from './components/addPartModalForm/add-part-modal-form/add-part-modal-form.component';
import { EditDocumentButtonComponent } from './components/edit-document-button/edit-document-button.component';
import { LittleTagComponent } from './components/tags/little-tag/little-tag.component';
import { TagSelectorComponent } from './components/tags/tag-selector/tag-selector.component';
import { OrgSelectorComponent } from './components/org-selector/org-selector.component';
import { LocSelectorComponent } from './components/loc-selector/loc-selector.component';
import { tagReducer } from '@app/_store/_tag-store/tag.reducers';
import { TagEffects } from '@app/_store/_tag-store/tag.effects';
import { OrgTagsBadgeComponent } from './components/tags/org-tags-badge/org-tags-badge.component';
import { OrgByTagNameNavigatorComponent } from './components/tags/org-by-tag-name-navigator/org-by-tag-name-navigator.component';
import { OrgSearchComponent } from './components/org-search/org-search.component';
import { AddTagModalFormComponent } from './components/tags/add-tag-modal-form/add-tag-modal-form.component';
import { MutateTagFormComponent } from './components/tags/mutate-tag-form/mutate-tag-form.component';
import { MutateTagModalComponent } from './components/tags/mutate-tag-modal/mutate-tag-modal.component';



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
    RepairStatDropdownComponent,
    CopyPartsBtnComponent,
    PartSelectorDropdownComponent,
    IsAuthenticatedDirective,
    AccessLevelDirective,
    AddPartModalFormComponent,
    EditDocumentButtonComponent,
    LittleTagComponent,
    TagSelectorComponent,
    OrgSelectorComponent,
    LocSelectorComponent,
    OrgTagsBadgeComponent,
    OrgByTagNameNavigatorComponent,
    OrgSearchComponent,
    AddTagModalFormComponent,
    MutateTagFormComponent,
    MutateTagModalComponent
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
    MatSelectModule,
    MatChipsModule,
    MatBadgeModule,
    MatTooltipModule,
    StoreModule.forFeature('tag', tagReducer),
    StoreModule.forFeature('part', partReducer),
    EffectsModule.forFeature([PartEffects, TagEffects])

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
    RepairStatDropdownComponent,
    CopyPartsBtnComponent,
    PartSelectorDropdownComponent,
    IsAuthenticatedDirective,
    AccessLevelDirective,
    AddPartModalFormComponent,
    EditDocumentButtonComponent,
    OrgSelectorComponent,
    LocSelectorComponent,
    LittleTagComponent,
    TagSelectorComponent,
    OrgTagsBadgeComponent,
    OrgSearchComponent,
    MutateTagFormComponent
  ]
})
export class UtilityModule { }
