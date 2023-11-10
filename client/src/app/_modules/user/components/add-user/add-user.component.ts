import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AppState } from '@app/_store/app.state';
import { Store} from '@ngrx/store';
import { addUser } from '@app/_store/_user-store/user.actions';
import { loadOrgNames } from '@app/_store/_org-store/org.actions';
import { selectOrgNames, orgErrorSelector, orgLoadingSelector } from '@app/_store/_org-store/org.selectors';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  orgNames$ = this.store.select(selectOrgNames);
  isLoadingOrgNames$ = this.store.select(orgLoadingSelector);
  orgNameError$ = this.store.select(orgErrorSelector);

  userForm = new FormGroup({
    userName: new FormControl<string>('', { nonNullable: true }),
    email: new FormControl<string>('', { nonNullable: true }),
    password: new FormControl<string>('', { nonNullable: true }),
    orgName: new FormControl<string>(''),
    accessLevel: new FormControl<string>('')
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

  constructor( 
    private store: Store<AppState>
  ){ }

  ngOnInit(): void {
    this.store.dispatch(loadOrgNames());
  }

  onSubmit() {

    console.log(this.userForm.value);

    const username = this.userForm.value.userName ?? '';
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
  }

}
