import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AppState } from '@app/_store/app.state';
import { Store } from '@ngrx/store';
import { addUser } from '@app/_store/_user-store/user.actions';
import { loadOrgNames } from '@app/_store/_org-store/org.actions';
import { selectOrgNames, orgErrorSelector, orgLoadingSelector } from '@app/_store/_org-store/org.selectors';
import { Organization } from '@app/graphql/schemas';
import { Observable, Subscription, map, startWith } from 'rxjs';

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

  constructor(
    private store: Store<AppState>
  ) {
    this.orgNames$ = this.store.select(selectOrgNames);
    this.isLoadingOrgNames$ = this.store.select(orgLoadingSelector);
    this.orgNameError$ = this.store.select(orgErrorSelector);
  }


  filteredOrgName$!: Observable<Organization[] | null>;

  userForm = new FormGroup({
    username: new FormControl<string>('', { nonNullable: true }),
    email: new FormControl<string>('', { nonNullable: true }),
    password: new FormControl<string>('', { nonNullable: true }),
    orgName: new FormControl<string>(''),
    accessLevel: new FormControl<string>('')
  });

  isSubmitted = false;

  filteredOrgNames!: Observable<Organization[]>;


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

    this.filteredOrgName$ = this.userForm.controls['orgName'].valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || ''))
    )
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
  };

  displayOrgName(org: Organization): string {
    return org && org.orgName ? org.orgName : '';
  };

  onSubmit() {

    console.log(this.userForm.value);

    const username = this.userForm.value.username ?? '';
    const email = this.userForm.value.email ?? '';
    const password = this.userForm.value.password ?? '';
    const orgName = this.userForm.value.orgName ?? '';
    const accessLevel = this.userForm.value.accessLevel ?? '';

    this.store.dispatch(
      addUser({
        username,
        email,
        password,
        orgName,
        accessLevel
      })
    )
  };


  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  };

}
