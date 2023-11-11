import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from '@app/services/users/user.service';
import { OrganizationService } from '@app/services/orgs/organization.service';
import { User, UpdateUserFields, Organization} from '@app/graphql/schemas/typeInterfaces';
import { ToastService } from '@app/services/toast/toast.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  userId!: string;
  user!: User;
  orgList!: Organization[];
  editUserForm!: FormGroup;
  loadingUser: boolean = true;
  loadingOrgs: boolean = true;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private orgService: OrganizationService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastService: ToastService
  ) {}

  loadUser(id: string): void {
    this.userService.querySingleUser(id)
    .subscribe(( { data }) => {
      console.log(data)
      this.user = data.user;
      this.populateForm();
      this.loadingUser = false;
    } )
  }

  loadOrgNames(): void {
    this.orgService.orgNames()
    .subscribe(( { data }) => {
      console.log(data.orgNames)
      this.orgList = data.orgNames;
      this.loadingOrgs = false;
    })
  }

  populateForm() {
    
    this.editUserForm.patchValue({
      username: this.user.username,
      email: this.user.email,
      accessLevel: this.user.accessLevel,
      orgName: this.user.orgName
    })
  }

  updateUser(updateUser: UpdateUserFields): void {
    this.userService.editUser(this.userId, updateUser).subscribe( { next: (result) => {

      const editedUser = result.data?.editUser ?? null;

      if (editedUser) {
        this.toastService.show('User Edited successfully!', {
          delay: 3000
        })

        this.router.navigate(['/one-user', editedUser._id])
      } else {
        this.router.navigate(['/'])
      }


    }, error: (error) => {
      console.error(error);

      this.toastService.show('Failed to edit User. Please Try Again', {
        delay: 3000
      })
    }
  
  
    });
  }

  onSubmit() {

    const sumbittedUser: UpdateUserFields = {
      username: this.editUserForm.value.username,
      email: this.editUserForm.value.email,
      accessLevel: this.editUserForm.value.accessLevel,
      orgName: this.editUserForm.value.orgName
    }

    this.updateUser(sumbittedUser);

  }

  ngOnInit(): void {

    this.editUserForm = this.formBuilder.group({
      username: '',
      email: '',
      accessLevel: '',
      orgName: ''
    })

    this.loadOrgNames();

    this.activatedRoute.params.subscribe((params: Params) => {
      this.userId = params['id'];
      this.loadUser(this.userId);
    })
      
  };

}
