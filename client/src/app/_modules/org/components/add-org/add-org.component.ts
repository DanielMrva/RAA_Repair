import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormArray, Validators, ValidatorFn } from '@angular/forms';
import { OrganizationService } from '@app/services/orgs/organization.service';
import { ToastService } from '@app/services/toast/toast.service';
import { Organization } from '@app/graphql/schemas';

@Component({
  selector: 'app-add-org',
  templateUrl: './add-org.component.html',
  styleUrls: ['./add-org.component.css']
})
export class AddOrgComponent implements OnInit {

  orgList!: Organization[];
  loadingOrgs: boolean = true;

  orgForm = this.formBuilder.group({
    orgName: ['', [Validators.required], this.orgNameValidator(this.orgList)],  });

  isSubmitted = false;

  constructor( 
    private formBuilder: FormBuilder,
    private orgService: OrganizationService,
    private router: Router,
    private toastService: ToastService
  ){ }

  ngOnInit(): void {
    this.loadOrgNames();
  };

  fieldValidCheck(field: string) {
    if (
      this.orgForm.get(`${field}`)?.invalid &&
      this.orgForm.get(`${field}`)?.dirty ||
      this.orgForm.get(`${field}`)?.touched ||
      this.isSubmitted) {
        return true
      } else {
        return false
      }
  };

  loadOrgNames(): void {
    this.orgService.orgNames()
    .subscribe(( { data }) => {
      console.log(data.orgNames)
      this.orgList = data.orgNames;
      this.loadingOrgs = false;
    })
  };

  orgNameValidator(orgList: Organization[]): ValidatorFn {
    return (control) => {
      const input = control.value;
      if (orgList.some((org) => org.orgName === input)) {
        return { orgNameExists: true };
      }
      return null;
    };
  }

  onSubmit() {

    console.log(this.orgForm.value);

    const orgName = this.orgForm.value.orgName ?? '';

    this.orgService.addOrg(
      orgName
    ).subscribe({ next: (result) => {
      const newOrg = result.data?.addOrg ?? null;

      if(newOrg) {
        this.toastService.show('Organization added successfully!', {
          delay: 3000
        })
        this.router.navigate(['/one-organization', newOrg._id]);

        this.isSubmitted = true;
      } else {
        this.router.navigate(['/']);
      
        this.isSubmitted = true;
      }
    }, error: (error) => {
      console.error(error);

      this.toastService.show('Failed to submit Organization. Please try again', {
        classname: 'bg-danger light-text',
        delay: 3000
      })
    }
  
    })

  }



}
