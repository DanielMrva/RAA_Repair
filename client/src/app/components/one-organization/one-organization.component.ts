import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrganizationService } from '@app/services/orgs/organization.service';
import { Organization } from '@app/graphql/schemas/typeInterfaces';

@Component({
  selector: 'app-one-organization',
  templateUrl: './one-organization.component.html',
  styleUrls: ['./one-organization.component.css']
})
export class OneOrganizationComponent implements OnInit{

  org: Organization | undefined;

  constructor(
    private route: ActivatedRoute,
    private orgService: OrganizationService
  ) {

  }

  loadOrg(orgId: string): void {
    this.orgService.querySingleOrg(orgId)
    .subscribe(( { data }) => {
      this.org = data.org;
    })
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const orgId = params['id'];
      this.loadOrg(orgId);
    })
      
  }
}
