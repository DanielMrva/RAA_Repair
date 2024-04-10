import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormArray, FormGroup, FormControl } from '@angular/forms';
import { Organization, Radio, UpdateRadioFields, Location } from '@app/graphql/schemas/typeInterfaces';
import { AppState } from '@app/_store/app.state';
import { Store } from '@ngrx/store';
import { editRadio, loadOneRadio } from '@app/_store/_radio-store/radio.actions';
import { selectOneRadio, radioErrorSelector, radioLoadingSelector } from '@app/_store/_radio-store/radio.selectors';
import { Observable, combineLatest } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { selectLocationNames, locationLoadingSelector, locationErrorSelector } from '@app/_store/_location-store/location.selectors';
import { selectOrgNames, orgLoadingSelector, orgErrorSelector } from '@app/_store/_org-store/org.selectors';
import { loadLocationNames } from '@app/_store/_location-store/location.actions';
import { loadOrgNames } from '@app/_store/_org-store/org.actions';

@Component({
  selector: 'app-edit-radio',
  templateUrl: './edit-radio.component.html',
  styleUrls: ['./edit-radio.component.css']
})
export class EditRadioComponent implements OnInit{

  isLoading$ = this.store.select(radioLoadingSelector);
  radioError$ = this.store.select(radioErrorSelector);
  oneRadio$ = this.store.select(selectOneRadio);

  orgNames$ = this.store.select(selectOrgNames);
  isLoadingOrgNames$ = this.store.select(orgLoadingSelector);
  orgNameError$ = this.store.select(orgErrorSelector);
  orgNameOptions: string[] = [];
  filteredOrgNames$!: Observable<string[]>;

  locationNames$ = this.store.select(selectLocationNames);
  isLoadingLocationNames$ = this.store.select(locationLoadingSelector);
  locationNameError$ = this.store.select(locationErrorSelector);
  locNameOptions: string[] = [];
  filteredLocNames$!: Observable<string[]>;

  radioID!: string;

  editRadioForm = new FormGroup({
    orgName: new FormControl<string>(''),
    locationName: new FormControl<string>(''),
    datePurchased: new FormControl<Date>(new Date()),
    dateEntered: new FormControl<Date>(new Date()),
    inventoryNumber: new FormControl<string>(''),
    make: new FormControl<string>(''),
    model: new FormControl<string>(''),
    progChannels: new FormControl<string>(''),
    notes: new FormArray([]),
    serialNumber: new FormControl<string>(''),
    warranty: new FormControl<Date>(new Date()),
    refurb: new FormControl<boolean>(false, { nonNullable: true }),
    radioType: new FormControl<string>(''),
  })



  get notesArray(): FormArray {
    return this.editRadioForm.get('notes') as FormArray;
  }
    
  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private store: Store<AppState>
  ) { }

  loadRadio(id: string): void {

    this.store.dispatch(loadOneRadio({radioID: id}))
  };

  populateForm() {

    this.oneRadio$.subscribe((radio: Radio | null) => {
      if (radio) {
      this.editRadioForm.patchValue({
          orgName: radio.orgName,
          locationName: radio.locationName,
          datePurchased: new Date(parseInt(radio.datePurchased)),
          dateEntered: new Date(parseInt(radio.dateEntered)),
          inventoryNumber: radio.inventoryNumber,
          make: radio.make,
          model: radio.model,
          progChannels: radio.progChannels,
          serialNumber: radio.serialNumber,
          warranty: new Date(parseInt(radio.warranty)),
          refurb: radio.refurb,
          radioType: radio.radioType
        });

        radio.notes.forEach(note => {
          (this.editRadioForm.get('notes') as FormArray).push(this.formBuilder.control(note));
        });

      }
    })
  };

  addNotes() {
    this.notesArray.push(new FormControl<string>('', { nonNullable: true}));
  };

  removeNote(index: number) {
    this.notesArray.removeAt(index);
  };

  updateRadio(updateRadio: UpdateRadioFields): void {

    this.oneRadio$.subscribe((radio: Radio | null) => {
      if (radio) {
        this.radioID = radio._id
      }
    })

    this.store.dispatch(editRadio({id: this.radioID, updates: updateRadio}))
  }

  onSubmit() {

    const orgName = this.editRadioForm.value.orgName ?? '';
    const locationName = this.editRadioForm.value.locationName ?? '';
    const datePurchased = this.editRadioForm.value.datePurchased ?? new Date();
    const dateEntered = this.editRadioForm.value.dateEntered ?? new Date();
    const inventoryNumber = this.editRadioForm.value.inventoryNumber ?? '';
    const make = this.editRadioForm.value.make ?? '';
    const model = this.editRadioForm.value.model ?? '';
    const progChannels = this.editRadioForm.value.progChannels ?? '';
    const notes = Array.isArray(this.editRadioForm.value.notes) ? this.editRadioForm.value.notes.map(note => note ?? '') : [''];    
    const serialNumber = this.editRadioForm.value.serialNumber ?? '';
    const warranty = this.editRadioForm.value.warranty ?? new Date();
    const refurb = this.editRadioForm.value.refurb ?? false;
    const radioType = this.editRadioForm.value.radioType ?? '';

    const submittedRadio: UpdateRadioFields = {
      orgName: orgName,
      locationName: locationName,
      datePurchased: new Date(datePurchased),
      dateEntered: new Date(dateEntered),
      inventoryNumber: inventoryNumber,
      make: make,
      model: model,
      progChannels: progChannels,
      notes: notes,
      serialNumber: serialNumber,
      warranty: new Date(warranty),
      refurb: refurb,
      radioType: radioType
      
    }

    this.updateRadio(submittedRadio);
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



  ngOnInit(): void {

    this.store.dispatch(loadOrgNames());
    this.store.dispatch(loadLocationNames())

    this.editRadioForm.patchValue({
      orgName: '',
      locationName: '',
      datePurchased: new Date(),
      dateEntered: new Date(),
      inventoryNumber: '',
      make: '',
      model: '',
      progChannels: '',
      notes: [],
      serialNumber: '',
      warranty: new Date(),
      refurb: false,
      radioType: ''
    })

    this.activatedRoute.params.subscribe((params: Params) => {
      this.radioID = params['id'];
      this.loadRadio(this.radioID);
    })

    this.populateForm();

    this.filteredOrgNames$ = this.editRadioForm.controls.orgName.valueChanges.pipe(
      startWith(''),
      map(value => this._filterOrgs(value || ''))
    )

    this.filteredLocNames$ = combineLatest([
      this.editRadioForm.controls.locationName.valueChanges.pipe(startWith('')),
      this.editRadioForm.controls.orgName.valueChanges.pipe(startWith('')),
      this.locationNames$,
    ]).pipe(
      map(([locName, orgName, locations]) => this._filterLocs(locName, orgName, locations))
    );

      
  };


}
