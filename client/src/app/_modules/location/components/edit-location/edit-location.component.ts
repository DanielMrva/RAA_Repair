import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormArray, FormGroup, FormControl, ValidatorFn, AbstractControl, ValidationErrors, Validators } from '@angular/forms';
import { Location, UpdateLocationFields } from '@app/graphql/schemas/typeInterfaces';
import { AppState } from '@app/_store/app.state';
import { Store } from '@ngrx/store';
import { editLocation, loadOneLocation, loadLocationNames } from '@app/_store/_location-store/location.actions';
import { selectOrgNames, orgErrorSelector, orgLoadingSelector } from '@app/_store/_org-store/org.selectors';
import { loadOrgNames } from '@app/_store/_org-store/org.actions';
import { selectLocationNames, locationErrorSelector, locationLoadingSelector, selectOneLocation } from '@app/_store/_location-store/location.selectors';
import { shareReplay, Subscription } from 'rxjs';



@Component({
  selector: 'app-edit-location',
  templateUrl: './edit-location.component.html',
  styleUrls: ['./edit-location.component.css']
})
export class EditLocationComponent implements OnInit, OnDestroy {

  private subscriptions = new Subscription();

  orgNames$
  isLoadingOrgNames$
  orgNameError$

  oneLocation$
  locationNames$
  isLoadingLocationNames$
  locationError$

    
  isSubmitted = false;

  filteredLocationNames: string[] = [];
  locationList!: Location[];


  locationId!: string;


  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private store: Store<AppState>
  ) {
    this.orgNames$ = this.store.select(selectOrgNames);
    this.isLoadingOrgNames$ = this.store.select(orgLoadingSelector);
    this.orgNameError$ = this.store.select(orgErrorSelector);

    this.oneLocation$ = this.store.select(selectOneLocation);
    this.locationNames$ = this.store.select(selectLocationNames).pipe(shareReplay(1));
    this.isLoadingLocationNames$ = this.store.select(locationLoadingSelector).pipe(shareReplay(1));
    this.locationError$ = this.store.select(locationErrorSelector);
  }

  editLocationForm = new FormGroup({
    locationName: new FormControl<string>('', Validators.required),
    orgName: new FormControl<string>('', Validators.required),
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

  ngOnInit(): void {

    this.subscriptions.add(
      this.activatedRoute.params.subscribe((params: Params) => {
        this.locationId = params['id'];
        this.loadLocation(this.locationId)
      })
    );
    
    this.populateForm();

    this.subscriptions.add(
      this.editLocationForm.get('orgName')!.valueChanges.subscribe(() => {
        this.editLocationForm.get('locationName')!.setValidators([
          Validators.required,
          this.locationNameValidator()
        ]);
        this.editLocationForm.get('locationName')!.updateValueAndValidity(); // Ensure validators are recalculated
      })
    );

    this.store.dispatch(loadOrgNames());
    this.loadLocationNames();
  };

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

  handleOrgNameSelected(orgName: string): void {
    this.editLocationForm.patchValue({orgName: orgName});
  };

  handleFilteredLocations(locations: string[]): void {
    this.filteredLocationNames = locations;
  }

  locationNameValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const input = control.value;
      const currentOrg = this.editLocationForm.get('orgName')?.value;
      if (this.locationList && this.locationList.some(loc => loc.locationName === input && loc.orgName === currentOrg)) {
        return { locationNameExists: true };
      }
      return null;
    };
  };

  loadLocationNames(): void {
    this.store.dispatch(loadLocationNames());

    this.subscriptions.add(
      this.locationNames$.subscribe((locL: Location[] | null) => {
        if (locL) {
          this.locationList = locL
        } else {
          this.locationList = [];
        }
      })
    );
  };

  loadLocation(id: string): void {
    this.store.dispatch(loadOneLocation({ locationId: id }))
  };

  populateForm() {

    this.subscriptions.add(
      this.oneLocation$.subscribe((location: Location | null) => {
        if (location) {
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
    );


  };

  updateLocation(updateLocation: UpdateLocationFields): void {

    this.subscriptions.add(
      this.oneLocation$.subscribe((location: Location | null) => {
        if (location) {
          this.locationId = location._id
        }
      })
    );

    this.store.dispatch(editLocation({ id: this.locationId, updates: updateLocation }))
  };

  prepareLocationData(): UpdateLocationFields {

    return {

      locationName: this.editLocationForm.value.locationName ?? '',
      orgName: this.editLocationForm.value.orgName ?? '',
      street: this.editLocationForm.value.street ?? '',
      suite: this.editLocationForm.value.suite ?? '',
      city: this.editLocationForm.value.city ?? '',
      state: this.editLocationForm.value.state ?? '',
      zip: this.editLocationForm.value.zip ?? '',
      country: this.editLocationForm.value.country ?? '',
      phone: this.editLocationForm.value.phone ?? '',
      contactEmail: this.editLocationForm.value.contactEmail ?? '',
      primaryContact: this.editLocationForm.value.primaryContact ?? ''

    }
  };



  onSubmit() {

    const submittedLocation: UpdateLocationFields = this.prepareLocationData();

    this.updateLocation(submittedLocation);


  };

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  };

}
