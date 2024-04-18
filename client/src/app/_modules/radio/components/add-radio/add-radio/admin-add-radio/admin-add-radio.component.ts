import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormControl } from '@angular/forms';
import { AppState } from '@app/_store/app.state';
import { Store } from '@ngrx/store';
import { addRadio } from '@app/_store/_radio-store/radio.actions';
import { selectOrgNames, orgErrorSelector, orgLoadingSelector } from '@app/_store/_org-store/org.selectors';
import { selectLocationNames, locationErrorSelector, locationLoadingSelector } from '@app/_store/_location-store/location.selectors';
import { loadOrgNames } from '@app/_store/_org-store/org.actions';
import { loadLocationNames } from '@app/_store/_location-store/location.actions';
import { Observable, combineLatest } from 'rxjs';
import { map, startWith } from 'rxjs/operators'
import { Organization } from '@app/graphql/schemas';
import { Location } from '@app/graphql/schemas';


@Component({
  selector: 'app-admin-add-radio',
  templateUrl: './admin-add-radio.component.html',
  styleUrls: ['./admin-add-radio.component.css']
})
export class AdminAddRadioComponent implements OnInit{

  orgNames$
  isLoadingOrgNames$
  orgNameError$

  locationNames$
  isLoadingLocationNames$
  locationNameError$

  orgNameOptions: string[] = [];
  filteredOrgNames$!: Observable<string[]>;


  locNameOptions: string[] = [];
  filteredLocNames$!: Observable<string[]>;

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

    this.filteredOrgNames$ = this.adminRadioForm.controls.orgName.valueChanges.pipe(
      startWith(''),
      map(value => this._filterOrgs(value || ''))
    )

    this.filteredLocNames$ = combineLatest([
      this.adminRadioForm.controls.locationName.valueChanges.pipe(startWith('')),
      this.adminRadioForm.controls.orgName.valueChanges.pipe(startWith('')),
      this.locationNames$,
    ]).pipe(
      map(([locName, orgName, locations]) => this._filterLocs(locName, orgName, locations))
    );
      
  }

  private _filterOrgs(value: string): string[] {
    const filterValue = value.toLowerCase();

    let orgOptions: string[] = []

    this.orgNames$.subscribe((orgList: Organization[] | []) => {
      if (orgList.length > 0) {
        orgOptions = orgList.map(org => org.orgName)
      } 
    })

    return orgOptions.filter(option => option.toLowerCase().includes(filterValue))

  }

  private _filterLocs(locValue: string | null, orgValue: string | null, locations: Location[]): string[] {
    const filteredLocValue = (locValue || '').toLowerCase();
    const filteredOrgValue = (orgValue || '').toLowerCase();
  
    let locOptions: string[] = [];
  
    locations.forEach((loc) => {
      if (loc.locationName.toLowerCase().includes(filteredLocValue) && loc.orgName.toLowerCase() === filteredOrgValue) {
        locOptions.push(loc.locationName);
      }
    });
  
    return locOptions;
  }

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
    const radioType = this.adminRadioForm.value.radioType ?? '';

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
  }
}
