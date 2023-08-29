import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Organization, UpdateOrgFields } from '@app/graphql/schemas/typeInterfaces';
import { ORG_NAMES, QUERY_SINGLEORG } from '@app/graphql/schemas/queries';
import { EDIT_ORG } from '@app/graphql/schemas/mutations';



@Injectable({
  providedIn: 'root'
})
export class OrganizationService {

  constructor(private apollo: Apollo) { }

  querySingleOrg(orgId: string) {
    return this.apollo.query<{org: Organization}> ({
      query: QUERY_SINGLEORG,
      variables: {
        orgId
      }
    })
  }

  editOrg(id: string, updates: UpdateOrgFields) {
    return this.apollo.mutate<{editOrg: Organization}> ({
      mutation: EDIT_ORG,
      variables: {id, updates}
    })
  }

  orgNames(){
    return this.apollo.query<{orgNames: Organization[]}> ({
      query: ORG_NAMES
    })
  }
}
