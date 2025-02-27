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
import { selectOrgNames, orgErrorSelector, orgLoadingSelector, orgNamesLoadingSelector } from '@app/_store/_org-store/org.selectors';
import { selectLocationNames, locationErrorSelector, locationLoadingSelector, locNamesLoadingSelector } from '@app/_store/_location-store/location.selectors';
import { Observable, Subscription, combineLatest, map, startWith } from 'rxjs';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit, OnDestroy {

  private subscriptions = new Subscription();

  oneUser$ = this.store.select(selectOneUser);
  isLoadingUser$ = this.store.select(userLoadingSelector);
  userError$ = this.store.select(userErrorSelector);


  initialOrgName: string = '';
  initialLocName: string = '';
  selectedOrg: string = '';

  filteredLocationNames: string[] = [];

  userId!: string;


  userForm = new FormGroup({
    username: new FormControl<string>('', { nonNullable: true }),
    email: new FormControl<string>('', { nonNullable: true }),
    password: new FormControl<string>('', { nonNullable: true }),
    orgName: new FormControl<string>(''),
    userLocation: new FormControl<string>(''),
    accessLevel: new FormControl<string>('')
  })

  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.loadOrgNames();
    this.loadLocationNames();

    this.activatedRoute.params.subscribe((params: Params) => {
      const userId = params['id'];
      this.loadUser(userId);
    });

    this.populateForm();
  }

  handleOrgNameSelected(orgName: string): void {
    this.selectedOrg = orgName;
    this.userForm.patchValue({orgName: orgName});
  };

  handleLocSelection(loc: string): void {
    this.userForm.patchValue({userLocation: loc})
  };



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
            password: user.password,
            orgName: user.orgName,
            userLocation: user.userLocation,
            accessLevel: user.accessLevel
          });
        }
      })
    );
  }

  onSubmit(): void {
    const username = this.userForm.value.username ?? '';
    const email = this.userForm.value.email ?? '';
    const password = this.userForm.value.password?.trim() !== '' ? this.userForm.value.password : undefined;
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
  
    // Only add password to the update object if it has a value
    if (password) {
      submittedUser.password = password;
    }
  
    this.updateUser(submittedUser);
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
  



  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}