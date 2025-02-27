import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Organization, UpdateOrgFields } from '@app/graphql/schemas/typeInterfaces';
import { ORG_NAMES, QUERY_ORGS, QUERY_SINGLEORG, QUERY_LIKE_ORGNAME, QUERY_ORGS_BY_LIKE_TAG, QUERY_ORGS_BY_TAG } from '@app/graphql/schemas/queries';
import { EDIT_ORG, ADD_ORG, DELETE_ORGANIZATION } from '@app/graphql/schemas/mutations';



@Injectable({
  providedIn: 'root'
})
export class OrganizationService {

  constructor(private apollo: Apollo) { }

  querySingleOrg(orgId: string) {
    return this.apollo.watchQuery<{org: Organization}> ({
      query: QUERY_SINGLEORG,
      variables: {
        orgId
      }
    })
  }

  queryLikeOrg(orgName: string) {
    return this.apollo.watchQuery<{likeOrg: Organization[]}> ({
      query: QUERY_LIKE_ORGNAME,
      variables: {
        orgName
      }
    })
  }

  queryOrgByLikeTag(tagNames: string[]) {
    return this.apollo.watchQuery<{orgsByLikeTag: Organization[]}> ({
      query: QUERY_ORGS_BY_LIKE_TAG,
      variables: {
        tagNames
      }
    })
  }

  queryOrgByTag(tagIDs: string[]) {
    return this.apollo.watchQuery<{orgsByTag: Organization[]}> ({
      query: QUERY_ORGS_BY_TAG,
      variables: {
        tagIDs
      }
    })
  }

  editOrg(id: string, updates: UpdateOrgFields) {
    return this.apollo.mutate<{editOrg: Organization}> ({
      mutation: EDIT_ORG,
      variables: {id, updates}
    })
  }

  orgNames() {
    return this.apollo.watchQuery<{orgNames: Organization[]}> ({
      query: ORG_NAMES
    })
  }

  allOrgs() {
    return this.apollo.watchQuery<{allOrgs: Organization[]}> ({
      query: QUERY_ORGS
    })
  }
  
  addOrg(orgName: string, tags: string[]) {
    return this.apollo.mutate<{addOrg: Organization}> ({
      mutation: ADD_ORG,
      variables: { orgName, tags}
    })
  }

  deleteOrganization(id: string) {
    return this.apollo.mutate<{deleteOrganization: Organization}> ({
      mutation: DELETE_ORGANIZATION,
      variables: {id}
    })
  }
}

// TODO: Standardize ID / Id naming convention across the app back to front end!