import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, ValidatorFn } from '@angular/forms';
import { AppState } from '@app/_store/app.state';
import { Store } from '@ngrx/store';
import { Location } from '@app/graphql/schemas';
import { addLocation } from '@app/_store/_location-store/location.actions';
import { selectOrgNames, orgErrorSelector, orgLoadingSelector } from '@app/_store/_org-store/org.selectors';
import { loadOrgNames } from '@app/_store/_org-store/org.actions';
import { loadLocationNames } from '@app/_store/_location-store/location.actions';
import { selectLocationNames, locationErrorSelector, locationLoadingSelector } from '@app/_store/_location-store/location.selectors';

@Component({
  selector: 'app-add-location',
  templateUrl: './add-location.component.html',
  styleUrls: ['./add-location.component.css']
})
export class AddLocationComponent implements OnInit{

  orgNames$ = this.store.select(selectOrgNames);
  isLoadingOrgNames$ = this.store.select(orgLoadingSelector);
  orgNameError$ = this.store.select(orgErrorSelector);

  locationNames$ = this.store.select(selectLocationNames);
  isLoadingLocationNames$ = this.store.select(locationLoadingSelector);
  locationError$ = this.store.select(locationErrorSelector);
  locationList!: Location[];

  locationForm = new FormGroup({
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
    primaryContact: new FormControl<string>(''),
  });

  isSubmitted = false;

  constructor(
    private store: Store<AppState>
  ) {}

  fieldValidCheck(field: string) {
    if (
      this.locationForm.get(`${field}`)?.invalid &&
      this.locationForm.get(`${field}`)?.dirty ||
      this.locationForm.get(`${field}`)?.touched ||
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

  ngOnInit(): void {
    this.store.dispatch(loadOrgNames())
    this.loadLocationNames();

  };

  onSubmit() {

    console.log(this.locationForm.value);

    const locationName = this.locationForm.value.locationName ?? '';
    const orgName = this.locationForm.value.orgName ?? '';
    const street = this.locationForm.value.street ?? '';
    const suite = this.locationForm.value.suite ?? '';
    const city = this.locationForm.value.city ?? '';
    const state = this.locationForm.value.state ?? '';
    const zip = this.locationForm.value.zip ?? '';
    const country = this.locationForm.value.country ?? '';
    const phone = this.locationForm.value.phone ?? '';
    const contactEmail = this.locationForm.value.contactEmail ?? '';
    const primaryContact = this.locationForm.value.primaryContact ?? '';

    this.store.dispatch(
      addLocation({
        locationName,
        orgName,
        street,
        suite,
        city,
        state,
        zip,
        country,
        phone,
        contactEmail,
        primaryContact

      })
    )


  }
}
