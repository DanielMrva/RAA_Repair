import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { UserService } from '@app/services/users/user.service';
import { OrganizationService } from '@app/services/orgs/organization.service';
import { User, UpdateUserFields, Organization} from '@app/graphql/schemas/typeInterfaces';
import { ToastService } from '@app/services/toast/toast.service';
import { AppState } from '@app/_store/app.state';
import { Store } from '@ngrx/store';
import { editUser, loadOneUser } from '@app/_store/_user-store/user.actions';
import { loadOrgNames } from '@app/_store/_org-store/org.actions';
import { selectOneUser, userErrorSelector, userLoadingSelector } from '@app/_store/_user-store/user.selectors';
import { selectOrgNames, orgErrorSelector, orgLoadingSelector } from '@app/_store/_org-store/org.selectors';


@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  orgNames$ = this.store.select(selectOrgNames);
  isLoadingOrgNames$ = this.store.select(orgLoadingSelector);
  orgNameError$ = this.store.select(orgErrorSelector);

  oneUser$ = this.store.select(selectOneUser);
  isLoadingUser$ = this.store.select(userLoadingSelector);
  userError$ = this.store.select(userErrorSelector);
  userId!: string;

  userForm = new FormGroup({
    userName: new FormControl<string>('', { nonNullable: true }),
    email: new FormControl<string>('', { nonNullable: true }),
    orgName: new FormControl<string>(''),
    accessLevel: new FormControl<string>('')
  })

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private orgService: OrganizationService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastService: ToastService,
    private store: Store<AppState>

  ) {}

  loadUser(id: string): void {

    this.store.dispatch(loadOneUser({userId: id}));
  }

  loadOrgNames(): void {

    this.store.dispatch(loadOrgNames());
  }

  populateForm() {

    this.oneUser$.subscribe((user: User | null) => {
      if(user) {
        this.userForm.patchValue({
          userName: user.username,
          email: user.email,
          orgName: user.orgName,
          accessLevel: user.accessLevel
        })
      }
    })
  };

  updateUser(updateUser: UpdateUserFields): void {

    this.oneUser$.subscribe((user: User | null) => {
      if(user) {
        this.userId = user._id
      }
    });

    this.store.dispatch(editUser({id: this.userId, updates: updateUser}))
  }

  onSubmit() {

    const username = this.userForm.value.userName ?? '';
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

  ngOnInit(): void {

    this.userForm.patchValue({
      userName: '',
      email: '',
      orgName: '',
      accessLevel: ''
    })

    this.loadOrgNames();

    this.activatedRoute.params.subscribe((params: Params) => {
      const userId = params['id'];
      this.loadUser(userId);
      
    });

    this.populateForm();
      
  };

}
