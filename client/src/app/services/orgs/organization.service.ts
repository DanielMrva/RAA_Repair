import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Organization } from '@app/graphql/schemas/typeInterfaces';
import { ORG_NAMES } from '@app/graphql/schemas';



@Injectable({
  providedIn: 'root'
})
export class OrganizationService {

  constructor(private apollo: Apollo) { }

  orgNames(){
    return this.apollo.query<{orgNames: Organization[]}> ({
      query: ORG_NAMES
    })
  }
}
