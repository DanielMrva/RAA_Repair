import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AppState } from '@app/_store/app.state';
import { Store } from '@ngrx/store';
import { addUser } from '@app/_store/_user-store/user.actions';
import { loadOrgNames } from '@app/_store/_org-store/org.actions';
import { selectOrgNames, orgErrorSelector, orgLoadingSelector } from '@app/_store/_org-store/org.selectors';
import { Organization, Location } from '@app/graphql/schemas';
import { Observable, Subscription, combineLatest, map, startWith } from 'rxjs';
import { locationErrorSelector, locationLoadingSelector, selectLocationNames } from '@app/_store/_location-store/location.selectors';
import { loadLocationNames } from '@app/_store/_location-store/location.actions';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit, OnDestroy {

  private subscriptions = new Subscription();

  orgNames$
  isLoadingOrgNames$
  orgNameError$

  locationNames$
  isLoadingLocationNames$
  locationNameError$

  filteredLocationNames: string[] = [];


  locNameOptions: string[] = [];
  filteredLocNames$!: Observable<string[]>;

  userForm = new FormGroup({
    username: new FormControl<string>('', { nonNullable: true }),
    email: new FormControl<string>('', { nonNullable: true }),
    password: new FormControl<string>('', { nonNullable: true }),
    accessLevel: new FormControl<string>(''),
    orgName: new FormControl<string>(''),
    userLocation: new FormControl<string>('')
  });

  isSubmitted = false;


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


  fieldValidCheck(field: string) {
    if (
      this.userForm.get(`${field}`)?.invalid &&
      this.userForm.get(`${field}`)?.dirty ||
      this.userForm.get(`${field}`)?.touched ||
      this.isSubmitted) {
      return true
    } else {
      return false
    }
  }



  ngOnInit(): void {
    this.store.dispatch(loadOrgNames());
    this.store.dispatch(loadLocationNames());

  };

  handleOrgNameSelected(orgName: string): void {
    this.userForm.patchValue({orgName: orgName});
  };

  handleFilteredLocations(locations: string[]): void {
    this.filteredLocationNames = locations;
  };

  displayOrgName(org: Organization): string {
    return org && org.orgName ? org.orgName : '';
  };

  onSubmit() {

    console.log(this.userForm.value);

    const username = this.userForm.value.username ?? '';
    const email = this.userForm.value.email ?? '';
    const password = this.userForm.value.password ?? '';
    const accessLevel = this.userForm.value.accessLevel ?? '';
    const orgName = this.userForm.value.orgName ?? '';
    const userLocation = this.userForm.value.userLocation ?? '';

    this.store.dispatch(
      addUser({
        username,
        email,
        password,
        accessLevel,
        orgName,
        userLocation
      })
    )
  };


  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  };

}
