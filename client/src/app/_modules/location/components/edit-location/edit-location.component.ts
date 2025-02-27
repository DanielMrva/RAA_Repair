import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Location, UpdateLocationFields } from '@app/graphql/schemas/typeInterfaces';
import { AppState } from '@app/_store/app.state';
import { Store } from '@ngrx/store';
import { editLocation, loadOneLocation, loadLocationNames } from '@app/_store/_location-store/location.actions';
import { selectOrgNames, orgErrorSelector, orgNamesLoadingSelector } from '@app/_store/_org-store/org.selectors';
import { loadOrgNames } from '@app/_store/_org-store/org.actions';
import { locationErrorSelector, locationLoadingSelector, selectOneLocation } from '@app/_store/_location-store/location.selectors';
import { Subscription } from 'rxjs';
import { locationNameAsyncValidator } from '@app/utils/location.validators';



@Component({
  selector: 'app-edit-location',
  templateUrl: './edit-location.component.html',
  styleUrls: ['./edit-location.component.css']
})
export class EditLocationComponent implements OnInit, OnDestroy {

  private subscriptions = new Subscription();

  oneLocation$ = this.store.select(selectOneLocation);
  isLocationLoading$ = this.store.select(locationLoadingSelector);
  locationError$ = this.store.select(locationErrorSelector);

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private store: Store<AppState>
  ) { }
  
  isSubmitted = false;
  initialOrgName: string = '';
  initialLocName: string = '';
  selectedOrg: string = '';
  locationId!: string;



  editLocationForm = new FormGroup({
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
    primaryContact: new FormControl<string>('')
  });

  ngOnInit(): void {

    this.subscriptions.add(
      this.activatedRoute.params.subscribe((params: Params) => {
        this.locationId = params['id'];
        this.loadLocation(this.locationId)
      })
    );

    this.store.dispatch(loadOrgNames());
    this.store.dispatch(loadLocationNames());

    this.populateForm();

    this.subscriptions.add(
      this.editLocationForm.get('orgName')!.valueChanges.subscribe(orgName => {
        this.selectedOrg = orgName || '';
      })
    )

  };
  
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
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
    this.selectedOrg = orgName;
    this.editLocationForm.patchValue({orgName: orgName});
  };

  handleLocSelection(loc: string): void {
    this.editLocationForm.patchValue({ locationName: loc });
  }

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

          this.initialOrgName = location.orgName;
          this.initialLocName = location.locationName;
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


}
