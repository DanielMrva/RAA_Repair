import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormArray, FormGroup, FormControl } from '@angular/forms';
import { Organization, Radio, UpdateRadioFields, Location } from '@app/graphql/schemas/typeInterfaces';
import { AppState } from '@app/_store/app.state';
import { Store } from '@ngrx/store';
import { editRadio, loadOneRadio } from '@app/_store/_radio-store/radio.actions';
import { selectOneRadio, radioErrorSelector, radioLoadingSelector } from '@app/_store/_radio-store/radio.selectors';
import { Observable, Subscription, combineLatest } from 'rxjs';
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
export class EditRadioComponent implements OnInit, OnDestroy {

  private subscriptions = new Subscription();

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

  isLoading$
  radioError$
  oneRadio$

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

  radioID!: string;


  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private store: Store<AppState>
  ) {
    this.isLoading$ = this.store.select(radioLoadingSelector);
    this.radioError$ = this.store.select(radioErrorSelector);
    this.oneRadio$ = this.store.select(selectOneRadio);

    this.orgNames$ = this.store.select(selectOrgNames);
    this.isLoadingOrgNames$ = this.store.select(orgLoadingSelector);
    this.orgNameError$ = this.store.select(orgErrorSelector);

    this.locationNames$ = this.store.select(selectLocationNames);
    this.isLoadingLocationNames$ = this.store.select(locationLoadingSelector);
    this.locationNameError$ = this.store.select(locationErrorSelector);
  }

  ngOnInit(): void {

    this.store.dispatch(loadOrgNames());
    this.store.dispatch(loadLocationNames())

    // this.editRadioForm.patchValue({
    //   orgName: '',
    //   locationName: '',
    //   datePurchased: new Date(),
    //   dateEntered: new Date(),
    //   inventoryNumber: '',
    //   make: '',
    //   model: '',
    //   progChannels: '',
    //   notes: [],
    //   serialNumber: '',
    //   warranty: new Date(),
    //   refurb: false,
    //   radioType: ''
    // })

    this.subscriptions.add(
      this.activatedRoute.params.subscribe((params: Params) => {
        this.radioID = params['id'];
        this.loadRadio(this.radioID);
      })
    );



    this.populateForm();

    this.filteredOrgNames$ = this.editRadioForm.controls.orgName.valueChanges.pipe(
      startWith(''),
      map(value => this._filterOrgs(value || ''))
    );

    this.filteredLocNames$ = combineLatest([
      this.editRadioForm.controls.locationName.valueChanges.pipe(startWith('')),
      this.editRadioForm.controls.orgName.valueChanges.pipe(startWith('')),
      this.locationNames$,
    ]).pipe(
      map(([locName, orgName, locations]) => this._filterLocs(locName, orgName, locations))
    );


  };





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
    otherType: new FormControl<string>('')
  });



  get notesArray(): FormArray {
    return this.editRadioForm.get('notes') as FormArray;
  }

  loadRadio(id: string): void {

    this.store.dispatch(loadOneRadio({ radioID: id }))
  };

  populateForm() {

    this.subscriptions.add(

      this.oneRadio$.subscribe((radio: Radio | null) => {
        if (radio) {

          const predefinedTypes = ['mobile', 'handheld', 'base station', 'other'];
          let radioType = radio.radioType;
          let otherType = '';

          if (!predefinedTypes.includes(radio.radioType.toLowerCase())) {
            radioType = 'other';
            otherType = radio.radioType;
          }

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
            radioType: radioType,
            otherType: otherType
          });

          radio.notes.forEach(note => {
            (this.editRadioForm.get('notes') as FormArray).push(this.formBuilder.control(note));
          });

        }
      })


    );

  };

  addNotes() {
    this.notesArray.push(new FormControl<string>('', { nonNullable: true }));
  };

  removeNote(index: number) {
    this.notesArray.removeAt(index);
  };

  updateRadio(updateRadio: UpdateRadioFields): void {



    this.store.dispatch(editRadio({ id: this.radioID, updates: updateRadio }))
  };

  prepareRadioData(): UpdateRadioFields {

    this.subscriptions.add(

      this.oneRadio$.subscribe((radio: Radio | null) => {
        if (radio) {
          this.radioID = radio._id
        }
      })

    )

    let radioType
    if (this.editRadioForm.value.radioType === "other") {
      radioType = this.editRadioForm.value.otherType ?? '';
    } else {
      radioType = this.editRadioForm.value.radioType ?? '';
    }

    return {


      orgName: this.editRadioForm.value.orgName ?? '',
      locationName: this.editRadioForm.value.locationName ?? '',
      datePurchased: this.editRadioForm.value.datePurchased ?? new Date(),
      dateEntered: this.editRadioForm.value.dateEntered ?? new Date(),
      inventoryNumber: this.editRadioForm.value.inventoryNumber ?? '',
      make: this.editRadioForm.value.make ?? '',
      model: this.editRadioForm.value.model ?? '',
      progChannels: this.editRadioForm.value.progChannels ?? '',
      notes: Array.isArray(this.editRadioForm.value.notes) ? this.editRadioForm.value.notes.map(note => note ?? '') : [''],
      serialNumber: this.editRadioForm.value.serialNumber ?? '',
      warranty: this.editRadioForm.value.warranty ?? new Date(),
      refurb: this.editRadioForm.value.refurb ?? false,
      radioType: radioType,

    }

  }

  onSubmit() {


    const submittedRadio: UpdateRadioFields = this.prepareRadioData();

    this.updateRadio(submittedRadio);
  };

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  };


}
