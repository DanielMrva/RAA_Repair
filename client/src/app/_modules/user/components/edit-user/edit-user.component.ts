import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { User, UpdateUserFields, Organization } from '@app/graphql/schemas/typeInterfaces';
import { AppState } from '@app/_store/app.state';
import { Store } from '@ngrx/store';
import { editUser, loadOneUser } from '@app/_store/_user-store/user.actions';
import { loadOrgNames } from '@app/_store/_org-store/org.actions';
import { selectOneUser, userErrorSelector, userLoadingSelector } from '@app/_store/_user-store/user.selectors';
import { selectOrgNames, orgErrorSelector, orgLoadingSelector } from '@app/_store/_org-store/org.selectors';
import { Observable, Subscription, map, startWith } from 'rxjs';


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

  oneUser$
  isLoadingUser$
  userError$

  userId!: string;
  filteredOrgName$!: Observable<Organization[] | null>;


  userForm = new FormGroup({
    username: new FormControl<string>('', { nonNullable: true }),
    email: new FormControl<string>('', { nonNullable: true }),
    orgName: new FormControl<string>(''),
    accessLevel: new FormControl<string>('')
  })

  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store<AppState>

  ) {
    this.orgNames$ = this.store.select(selectOrgNames);
    this.isLoadingOrgNames$ = this.store.select(orgLoadingSelector);
    this.orgNameError$ = this.store.select(orgErrorSelector);

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

  populateForm() {

    this.subscriptions.add(

      this.oneUser$.subscribe((user: User | null) => {
        if (user) {
          this.userForm.patchValue({
            username: user.username,
            email: user.email,
            orgName: user.orgName,
            accessLevel: user.accessLevel
          })
        }
      })
    );


  };

  updateUser(updateUser: UpdateUserFields): void {

    this.subscriptions.add(
      this.oneUser$.subscribe((user: User | null) => {
        if (user) {
          this.userId = user._id
        }
      })
    );
    this.store.dispatch(editUser({ id: this.userId, updates: updateUser }))
  }

  ngOnInit(): void {

    this.userForm.patchValue({
      username: '',
      email: '',
      orgName: '',
      accessLevel: ''
    })

    this.loadOrgNames();

    this.filteredOrgName$ = this.userForm.controls['orgName'].valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || ''))
    )

    this.activatedRoute.params.subscribe((params: Params) => {
      const userId = params['id'];
      this.loadUser(userId);

    });

    this.populateForm();

  };


  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  };

  private _filter(value: string): Organization[] {
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

  displayOrgName(org: Organization): string {
    return org && org.orgName ? org.orgName : '';
  };

  onSubmit() {

    const username = this.userForm.value.username ?? '';
    const email = this.userForm.value.email ?? '';
    const accessLevel = this.userForm.value.accessLevel ?? '';
    const orgName = this.userForm.value.orgName ?? '';

    const sumbittedUser: UpdateUserFields = {
      username: username,
      email: email,
      accessLevel: accessLevel,
      orgName: orgName
    }

    this.updateUser(sumbittedUser);

  }

}
