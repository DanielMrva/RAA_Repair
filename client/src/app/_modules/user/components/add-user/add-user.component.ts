import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { UserService } from '@app/services/users/user.service';
import { OrganizationService } from '@app/services/orgs/organization.service';
import { ToastService } from '@app/services/toast/toast.service';
import { Organization, User } from '@app/graphql/schemas';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  orgList!: Organization[];
  loadingOrgs: boolean = true;

  userForm = this.formBuilder.group({
    username: '',
    email: '',
    orgName: '',
    accessLevel: '',

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
    private formBuilder: FormBuilder,
    private userService: UserService,
    private orgService: OrganizationService,
    private router: Router,
    private toastService: ToastService
  ){ }

  ngOnInit(): void {
    this.loadOrgNames();
  }

  loadOrgNames(): void {
    this.orgService.orgNames()
    .subscribe(( { data }) => {
      console.log(data.orgNames)
      this.orgList = data.orgNames;
      this.loadingOrgs = false;
    })
  }

  onSubmit() {

    console.log(this.userForm.value);

    const username = this.userForm.value.username ?? '';
    const email = this.userForm.value.email ?? '';
    const orgName = this.userForm.value.orgName ?? '';
    const accessLevel = this.userForm.value.accessLevel ?? '';

    this.userService.addUser(
      username,
      email,
      orgName,
      accessLevel
    ).subscribe({ next: (result) => {
      const newUser = result.data?.addUser ?? null;

      if(newUser) {
        this.toastService.show('User added successfully!', {
          delay: 3000
        })
        this.router.navigate(['/one-user', newUser._id]);

        this.isSubmitted = true;
      } else {
        this.router.navigate(['/']);

        this.isSubmitted = true;
      }
    }, error: (error) => {
      console.error(error);

      this.toastService.show('Failed to submit User. Please try again', {
        classname: 'bg-danger light-text',
        delay: 3000
      })
    }
  
    })

  }

}
