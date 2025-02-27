import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, ValidatorFn, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { AppState } from '@app/_store/app.state';
import { Store } from '@ngrx/store';
import { Location, UpdateLocationFields } from '@app/graphql/schemas';
import { addLocation } from '@app/_store/_location-store/location.actions';
import { selectOrgNames, orgErrorSelector, orgNamesLoadingSelector } from '@app/_store/_org-store/org.selectors';
import { loadOrgNames } from '@app/_store/_org-store/org.actions';
import { loadLocationNames } from '@app/_store/_location-store/location.actions';
import { selectLocationNames, locationErrorSelector, locNamesLoadingSelector } from '@app/_store/_location-store/location.selectors';
import { Subscription } from 'rxjs';
import { locationNameAsyncValidator } from '@app/utils/location.validators';

@Component({
  selector: 'app-add-location',
  templateUrl: './add-location.component.html',
  styleUrls: ['./add-location.component.css']
})
export class AddLocationComponent implements OnInit, OnDestroy {

  private subscriptions = new Subscription();

  orgNames$ = this.store.select(selectOrgNames);
  isLoadingOrgNames$ = this.store.select(orgNamesLoadingSelector);
  orgNameError$ = this.store.select(orgErrorSelector);

  locationNames$ = this.store.select(selectLocationNames);
  isLoadingLocationNames$ = this.store.select(locNamesLoadingSelector);
  locationError$ = this.store.select(locationErrorSelector);

  constructor(
    private store: Store<AppState>
  ) { }

  isSubmitted = false;
  initialOrgName: string = '';
  selectedOrg: string = '';

  locationForm = new FormGroup({
    locationName: new FormControl<string>('', {validators: [Validators.required]}),
    orgName: new FormControl<string>('', Validators.required),
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

  ngOnInit(): void {
    this.store.dispatch(loadOrgNames());
    this.store.dispatch(loadLocationNames());

    this.subscriptions.add(
      this.locationForm.get('orgName')!.valueChanges.subscribe(orgName => {
        this.selectedOrg = orgName ?? '';

        this.locationForm.get('locationName')!.setAsyncValidators(locationNameAsyncValidator(orgName, this.store));

        this.locationForm.get('locationName')!.updateValueAndValidity();
      })
    )

  };

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  };

  handleOrgNameSelected(orgName: string): void {
    this.selectedOrg = orgName;
    this.locationForm.patchValue({orgName: orgName});
  };

  handleLocSelection(loc: string): void {
    this.locationForm.patchValue({ locationName: loc });
  };

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

  prepareLocationData(): UpdateLocationFields {

    return {

      locationName: this.locationForm.value.locationName ?? '',
      orgName: this.locationForm.value.orgName ?? '',
      street: this.locationForm.value.street ?? '',
      suite: this.locationForm.value.suite ?? '',
      city: this.locationForm.value.city ?? '',
      state: this.locationForm.value.state ?? '',
      zip: this.locationForm.value.zip ?? '',
      country: this.locationForm.value.country ?? '',
      phone: this.locationForm.value.phone ?? '',
      contactEmail: this.locationForm.value.contactEmail ?? '',
      primaryContact: this.locationForm.value.primaryContact ?? ''

    }
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


  };


}

