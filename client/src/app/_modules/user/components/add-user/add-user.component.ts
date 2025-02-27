import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AppState } from '@app/_store/app.state';
import { Store } from '@ngrx/store';
import { addUser } from '@app/_store/_user-store/user.actions';
import { loadOrgNames } from '@app/_store/_org-store/org.actions';
import { selectOrgNames, orgErrorSelector, orgLoadingSelector, orgNamesLoadingSelector } from '@app/_store/_org-store/org.selectors';
import { Organization, Location } from '@app/graphql/schemas';
import { Observable, Subscription, combineLatest, map, startWith } from 'rxjs';
import { locationErrorSelector, locationLoadingSelector, locNamesLoadingSelector, selectLocationNames } from '@app/_store/_location-store/location.selectors';
import { loadLocationNames } from '@app/_store/_location-store/location.actions';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit, OnDestroy {

  private subscriptions = new Subscription();

  orgNames$ = this.store.select(selectOrgNames);
  isLoadingOrgNames$ = this.store.select(orgNamesLoadingSelector);
  orgNameError$ = this.store.select(orgErrorSelector);

  locationNames$ = this.store.select(selectLocationNames);
  isLoadingLocationNames$ = this.store.select(locNamesLoadingSelector);
  locationNameError$ = this.store.select(locationErrorSelector);

  constructor(
    private store: Store<AppState>
  ) { }

  
  isSubmitted = false;
  initialOrgName: string = '';
  selectedOrg: string = '';

  userForm = new FormGroup({
    username: new FormControl<string>('', { nonNullable: true }),
    email: new FormControl<string>('', { nonNullable: true }),
    password: new FormControl<string>('', { nonNullable: true }),
    accessLevel: new FormControl<string>(''),
    orgName: new FormControl<string>(''),
    userLocation: new FormControl<string>('')
  });

  ngOnInit(): void {
    this.store.dispatch(loadOrgNames());
    this.store.dispatch(loadLocationNames());

  };

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  };


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





  handleOrgNameSelected(orgName: string): void {
    this.selectedOrg = orgName;
    this.userForm.patchValue({orgName: orgName});
  };

  handleLocSelection(loc: string): void {
    this.userForm.patchValue({userLocation: loc});
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



}
