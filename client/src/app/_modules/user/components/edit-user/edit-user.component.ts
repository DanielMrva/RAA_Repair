import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { User, UpdateUserFields, Organization, Location } from '@app/graphql/schemas/typeInterfaces';
import { AppState } from '@app/_store/app.state';
import { Store } from '@ngrx/store';
import { editUser, loadOneUser } from '@app/_store/_user-store/user.actions';
import { loadOrgNames } from '@app/_store/_org-store/org.actions';
import { loadLocationNames } from '@app/_store/_location-store/location.actions';
import { selectOneUser, userErrorSelector, userLoadingSelector } from '@app/_store/_user-store/user.selectors';
import { selectOrgNames, orgErrorSelector, orgLoadingSelector } from '@app/_store/_org-store/org.selectors';
import { selectLocationNames, locationErrorSelector, locationLoadingSelector } from '@app/_store/_location-store/location.selectors';
import { Observable, Subscription, combineLatest, map, startWith } from 'rxjs';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit, OnDestroy {

  private subscriptions = new Subscription();

  orgNames$
  isLoadingOrgNames$
  orgNameError$

  locationNames$
  isLoadingLocationNames$
  locationNameError$

  oneUser$
  isLoadingUser$
  userError$

  userId!: string;
  filteredOrgName$!: Observable<Organization[] | null>;
  filteredLocNames$!: Observable<string[]>;

  userForm = new FormGroup({
    username: new FormControl<string>('', { nonNullable: true }),
    email: new FormControl<string>('', { nonNullable: true }),
    orgName: new FormControl<string>(''),
    userLocation: new FormControl<string>(''),
    accessLevel: new FormControl<string>('')
  })

  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store<AppState>
  ) {
    this.orgNames$ = this.store.select(selectOrgNames);
    this.isLoadingOrgNames$ = this.store.select(orgLoadingSelector);
    this.orgNameError$ = this.store.select(orgErrorSelector);

    this.locationNames$ = this.store.select(selectLocationNames);
    this.isLoadingLocationNames$ = this.store.select(locationLoadingSelector);
    this.locationNameError$ = this.store.select(locationErrorSelector);

    this.oneUser$ = this.store.select(selectOneUser);
    this.isLoadingUser$ = this.store.select(userLoadingSelector);
    this.userError$ = this.store.select(userErrorSelector);
  }

  loadUser(id: string): void {
    this.store.dispatch(loadOneUser({ userId: id }));
  }

  loadOrgNames(): void {
    this.store.dispatch(loadOrgNames());
  }

  loadLocationNames(): void {
    this.store.dispatch(loadLocationNames());
  }

  populateForm() {
    this.subscriptions.add(
      this.oneUser$.subscribe((user: User | null) => {
        if (user) {
          this.userForm.patchValue({
            username: user.username,
            email: user.email,
            orgName: user.orgName,
            userLocation: user.userLocation,
            accessLevel: user.accessLevel
          });
        }
      })
    );
  }

  updateUser(updateUser: UpdateUserFields): void {
    this.subscriptions.add(
      this.oneUser$.subscribe((user: User | null) => {
        if (user) {
          this.userId = user._id;
        }
      })
    );
    this.store.dispatch(editUser({ id: this.userId, updates: updateUser }));
  }

  ngOnInit(): void {
    this.loadOrgNames();
    this.loadLocationNames();

    this.filteredOrgName$ = this.userForm.controls['orgName'].valueChanges.pipe(
      startWith(''),
      map(value => this._filterOrgs(value || ''))
    );

    this.filteredLocNames$ = combineLatest([
      this.userForm.controls.userLocation.valueChanges.pipe(startWith('')),
      this.userForm.controls.orgName.valueChanges.pipe(startWith('')),
      this.locationNames$,
    ]).pipe(
      map(([locName, orgName, locations]) => this._filterLocs(locName, orgName, locations))
    );

    this.activatedRoute.params.subscribe((params: Params) => {
      const userId = params['id'];
      this.loadUser(userId);
    });

    this.populateForm();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  private _filterOrgs(value: string): Organization[] {
    const filterValue = value.toLowerCase();
    let orgList: Organization[] = [];

    this.subscriptions.add(
      this.orgNames$.subscribe((orgs: Organization[] | null) => {
        if (orgs) {
          orgList = orgs.filter(org => org.orgName.toLowerCase().includes(filterValue));
        }
      })
    );

    return orgList;
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

  onSubmit(): void {
    const username = this.userForm.value.username ?? '';
    const email = this.userForm.value.email ?? '';
    const accessLevel = this.userForm.value.accessLevel ?? '';
    const orgName = this.userForm.value.orgName ?? '';
    const userLocation = this.userForm.value.userLocation ?? '';

    const submittedUser: UpdateUserFields = {
      username,
      email,
      accessLevel,
      orgName,
      userLocation
    };

    this.updateUser(submittedUser);
  }
}
