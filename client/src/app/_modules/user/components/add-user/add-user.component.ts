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

  userForm = new FormGroup({
    username: new FormControl<string>('', { nonNullable: true }),
    email: new FormControl<string>('', { nonNullable: true }),
    password: new FormControl<string>('', { nonNullable: true }),
    accessLevel: new FormControl<string>(''),
    orgName: new FormControl<string>(''),
    userLocation: new FormControl<string>('')
  });

  isSubmitted = false;

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

    this.filteredOrgNames$ = this.userForm.controls.orgName.valueChanges.pipe(
      startWith(''),
      map(value => this._filterOrgs(value || ''))
    )

    this.filteredLocNames$ = combineLatest([
      this.userForm.controls.userLocation.valueChanges.pipe(startWith('')),
      this.userForm.controls.orgName.valueChanges.pipe(startWith('')),
      this.locationNames$,
    ]).pipe(
      map(([locName, orgName, locations]) => this._filterLocs(locName, orgName, locations))
    );

  };


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
