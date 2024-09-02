import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormControl } from '@angular/forms';
import { AppState } from '@app/_store/app.state';
import { Store } from '@ngrx/store';
import { addRadio } from '@app/_store/_radio-store/radio.actions';
import { selectOrgNames, orgErrorSelector, orgLoadingSelector } from '@app/_store/_org-store/org.selectors';
import { selectLocationNames, locationErrorSelector, locationLoadingSelector } from '@app/_store/_location-store/location.selectors';
import { loadOrgNames } from '@app/_store/_org-store/org.actions';
import { loadLocationNames } from '@app/_store/_location-store/location.actions';
import { Observable, Subscription, combineLatest } from 'rxjs';


@Component({
  selector: 'app-admin-add-radio',
  templateUrl: './admin-add-radio.component.html',
  styleUrls: ['./admin-add-radio.component.css']
})
export class AdminAddRadioComponent implements OnInit, OnDestroy{

  private subscriptions = new Subscription();

  orgNames$
  isLoadingOrgNames$
  orgNameError$

  locationNames$
  isLoadingLocationNames$
  locationNameError$

  orgNameOptions: string[] = [];
  initialOrgName: string | null = null;

  filteredLocNames: string[] = [];

  constructor(
    private store: Store<AppState>
  ) {
    this.orgNames$ = this.store.select(selectOrgNames);
    this.isLoadingOrgNames$ = this.store.select(orgLoadingSelector);
    this.orgNameError$ = this.store.select(orgErrorSelector);
  
    this.locationNames$ = this.store.select(selectLocationNames);
    this.isLoadingLocationNames$ = this.store.select(locationLoadingSelector);
    this.locationNameError$ = this.store.select(locationErrorSelector);
   }




  adminRadioForm = new FormGroup({
    orgName: new FormControl<string>(''),
    locationName: new FormControl<string>(''),
    datePurchased: new FormControl<string>(''),
    dateEntered: new FormControl<string>(''),
    inventoryNumber: new FormControl<string>(''),
    make: new FormControl<string>(''),
    model: new FormControl<string>(''),
    progChannels: new FormControl<string>(''),
    notes: new FormArray( [new FormControl<string>('', { nonNullable: true})] ),
    serialNumber: new FormControl<string>(''),
    warranty: new FormControl<string>(''),
    refurb: new FormControl<boolean>(false, { nonNullable: true }),
    radioType: new FormControl<string>(''),
    otherType: new FormControl<string>('')
  })

  isSubmitted = false;

  get notesArray(): FormArray {
    return this.adminRadioForm.get('notes') as FormArray;
  }
  addNotes() {
    this.notesArray.push(new FormControl<string>('', { nonNullable: true}));
  }

  removeNotes(index: number) {
    this.notesArray.removeAt(index);
  }

  fieldValidCheck(field: string) {
    if (
      this.adminRadioForm.get(`${field}`)?.invalid &&
      this.adminRadioForm.get(`${field}`)?.dirty ||
      this.adminRadioForm.get(`${field}`)?.touched ||
      this.isSubmitted) {
        return true
      } else {
        return false
      }
  }


  ngOnInit(): void {
    this.store.dispatch(loadOrgNames())
    this.store.dispatch(loadLocationNames())

  }

  handleOrgNameSelected(orgName: string): void {
    this.adminRadioForm.patchValue({orgName: orgName});
  };

  handleFilteredLocations(locations: string[]): void {
    this.filteredLocNames = locations;
  };

  onSubmit() {

    console.log(this.adminRadioForm.value)

    const orgName = this.adminRadioForm.value.orgName ?? '';
    const locationName = this.adminRadioForm.value.locationName ?? '';
    const datePurchased = this.adminRadioForm.value.datePurchased ?? '';
    const dateEntered = this.adminRadioForm.value.dateEntered ?? '';
    const inventoryNumber = this.adminRadioForm.value.inventoryNumber ?? '';
    const make = this.adminRadioForm.value.make ?? '';
    const model = this.adminRadioForm.value.model ?? '';
    const progChannels = this.adminRadioForm.value.progChannels ?? '';
    const notes = Array.isArray(this.adminRadioForm.value.notes) ? this.adminRadioForm.value.notes.map(note => note ?? '') : [''];    
    const serialNumber = this.adminRadioForm.value.serialNumber ?? '';
    const warranty = this.adminRadioForm.value.warranty ?? '';
    const refurb = this.adminRadioForm.value.refurb ?? false;
    let radioType
    if (this.adminRadioForm.value.radioType === "other") {
      radioType = this.adminRadioForm.value.otherType ?? '';
    } else {
      radioType = this.adminRadioForm.value.radioType ?? '';
    }

    this.store.dispatch(
      addRadio({
          orgName,
          locationName,
          datePurchased,
          dateEntered,
          inventoryNumber,
          make,
          model,
          progChannels,
          notes,
          serialNumber,
          warranty,
          refurb,
          radioType
        })
      
      )
  };

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  };
}
