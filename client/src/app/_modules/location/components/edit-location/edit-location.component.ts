import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormArray, FormGroup, FormControl, ValidatorFn } from '@angular/forms';
import { Location, UpdateLocationFields } from '@app/graphql/schemas/typeInterfaces';
import { AppState } from '@app/_store/app.state';
import { Store } from '@ngrx/store';
import { editLocation, loadOneLocation, loadLocationNames } from '@app/_store/_location-store/location.actions';
import { selectOrgNames, orgErrorSelector, orgLoadingSelector } from '@app/_store/_org-store/org.selectors';
import { loadOrgNames } from '@app/_store/_org-store/org.actions';
import { selectLocationNames, locationErrorSelector, locationLoadingSelector, selectOneLocation } from '@app/_store/_location-store/location.selectors';



@Component({
  selector: 'app-edit-location',
  templateUrl: './edit-location.component.html',
  styleUrls: ['./edit-location.component.css']
})
export class EditLocationComponent implements OnInit{

  editLocationForm = new FormGroup({
    locationName: new FormControl<string>(''),
    orgName: new FormControl<string>(''),
    street: new FormControl<string>(''),
    suite: new FormControl<string>(''),
    city: new FormControl<string>(''),
    state: new FormControl<string>(''),
    zip: new FormControl<string>(''),
    country: new FormControl<string>(''),
    phone: new FormControl<string>(''),
    contactEmail: new FormControl<string>(''),
    primaryContact: new FormControl<string>('')
  });

  isSubmitted = false;

  orgNames$ = this.store.select(selectOrgNames);
  isLoadingOrgNames$ = this.store.select(orgLoadingSelector);
  orgNameError$ = this.store.select(orgErrorSelector);

  oneLocation$ = this.store.select(selectOneLocation);
  locationNames$ = this.store.select(selectLocationNames);
  isLoadingLocationNames$ = this.store.select(locationLoadingSelector);
  locationError$ = this.store.select(locationErrorSelector);
  locationList!: Location[];

  locationId!: string;

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private store: Store<AppState>
  ) { }

  fieldValidCheck(field: string) {
    if (
      this.editLocationForm.get(`${field}`)?.invalid &&
      this.editLocationForm.get(`${field}`)?.dirty ||
      this.editLocationForm.get(`${field}`)?.touched ||
      this.isSubmitted) {
        return true
      } else {
        return false
      }
  };

  locationNameValidator(): ValidatorFn {
    return (control) => {
      const input = control.value;
      if (this.locationList && this.locationList.some((loc) => loc.locationName === input)) {
        return { locationNameExists: true}
      }
      return null;
    }
  };

  loadLocationNames(): void {
    this.store.dispatch(loadLocationNames());

    this.locationNames$.subscribe(( locL: Location[] | null ) => {
      if(locL) {
        this.locationList = locL
      } else {
        this.locationList = [];
      }
    })
    
  };

  loadLocation(id: string): void {
    this.store.dispatch(loadOneLocation({locationId: id}))
  };

  populateForm() {
    this.oneLocation$.subscribe((location: Location | null) => {
      if(location) {
        this.editLocationForm.patchValue({
          locationName: location.locationName,
          orgName: location.orgName,
          street: location.street,
          suite: location.suite,
          city: location.city,
          state: location.state,
          zip: location.zip,
          country: location.country,
          phone: location.phone,
          contactEmail: location.contactEmail,
          primaryContact: location.primaryContact
        })
      }
    })
  };

  updateLocation(updateLocation: UpdateLocationFields): void {
    this.oneLocation$.subscribe((location: Location | null) => {
      if(location) {
        this.locationId = location._id
      }
    })

    this.store.dispatch(editLocation({id: this.locationId, updates: updateLocation}))
  }

  onSubmit() {

    console.log(this.editLocationForm.value);

    const locationName = this.editLocationForm.value.locationName ?? '';
    const orgName = this.editLocationForm.value.orgName ?? '';
    const street = this.editLocationForm.value.street ?? '';
    const suite = this.editLocationForm.value.suite ?? '';
    const city = this.editLocationForm.value.city ?? '';
    const state = this.editLocationForm.value.state ?? '';
    const zip = this.editLocationForm.value.zip ?? '';
    const country = this.editLocationForm.value.country ?? '';
    const phone = this.editLocationForm.value.phone ?? '';
    const contactEmail = this.editLocationForm.value.contactEmail ?? '';
    const primaryContact = this.editLocationForm.value.primaryContact ?? '';

    const submittedLocation: UpdateLocationFields = {
      locationName: locationName,
      orgName: orgName,
      street: street,
      suite: suite,
      city: city,
      state: state,
      zip: zip,
      country: country,
      phone: phone,
      contactEmail: contactEmail,
      primaryContact: primaryContact
    }

    this.updateLocation(submittedLocation);


  }

  ngOnInit(): void {
    this.editLocationForm.patchValue({
      locationName: '',
      orgName: '',
      street: '',
      suite: '',
      city: '',
      state: '',
      zip: '',
      country: '',
      phone: '',
      contactEmail: '',
      primaryContact: '',
    })

    this.activatedRoute.params.subscribe((params: Params) => {
      this.locationId = params['id'];
      this.loadLocation(this.locationId)
    })

    this.populateForm();

    this.store.dispatch(loadOrgNames());
    this.loadLocationNames();
  }

}
