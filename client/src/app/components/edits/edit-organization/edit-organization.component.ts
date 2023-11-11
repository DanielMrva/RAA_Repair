import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { OrganizationService } from '@app/services/orgs/organization.service';
import { UpdateOrgFields, Organization} from '@app/graphql/schemas/typeInterfaces';
import { ToastService } from '@app/services/toast/toast.service';

@Component({
  selector: 'app-edit-organization',
  templateUrl: './edit-organization.component.html',
  styleUrls: ['./edit-organization.component.css']
})
export class EditOrganizationComponent implements OnInit{

  orgId!: string;
  org!: Organization;
  editOrgForm!: FormGroup;
  loadingOrg: boolean = true;

  constructor(
    private formBuilder: FormBuilder,
    private orgService: OrganizationService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastService: ToastService
  ) {}

  loadOrg(id: string): void {
    this.orgService.querySingleOrg(id)
    .subscribe(( { data }) => {
      console.log(data)
      this.org = data.org;
      this.populateForm();
      this.loadingOrg = false;
    })
  }

  populateForm() {
    this.editOrgForm.patchValue({
      orgName: this.org.orgName
    })
  }

  updateOrg(updateOrg: UpdateOrgFields): void {
    this.orgService.editOrg(this.orgId, updateOrg).subscribe( { next: (result) => {
      const editiedOrg = result.data?.editOrg ?? null;

      if (editiedOrg) {
        this.toastService.show('Organization Editied successfully!', {
          delay: 3000
        })

        this.router.navigate(['/one-org', editiedOrg._id]);
      } else {
        this.router.navigate(['/'])
      }
    }, error: (error) => {
      console.error(error);

      this.toastService.show('Falied to edit Organization. Please Try Again', {
        delay: 3000
      })
    }
  
    })
  }

  onSubmit() {
    const sumbittedOrg: UpdateOrgFields = {
      orgName: this.editOrgForm.value.orgName
    }

    this.updateOrg(sumbittedOrg)
  }


  ngOnInit(): void {

    this.editOrgForm = this.formBuilder.group({
      orgName: '',
    })

    this.activatedRoute.params.subscribe((params: Params) => {
      this.orgId = params['id'];
      this.loadOrg(this.orgId);
    })
      
  }
}
