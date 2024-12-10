import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Part, UpdatePartFields, AddPartFields } from '@app/graphql/schemas';
import { ADD_PART, EDIT_PART, DELETE_PART } from '@app/graphql/schemas';
import { QUERY_PARTS, QUERY_SINGLE_PART, QUERY_LIKE_PART_PN_PD } from '@app/graphql/schemas';

@Injectable({
  providedIn: 'root'
})
export class PartService {

  constructor(private apollo: Apollo) { }

  querySinglePart(partId: string) {
    return this.apollo.watchQuery<{part: Part}> ({
      query: QUERY_SINGLE_PART,
      variables: {
        partId
      }
    })
  }

  allParts() {
    return this.apollo.watchQuery<{allParts: Part[]}> ({
      query: QUERY_PARTS
    })
  }

  queryLikePartPnPd(partNumber: string, partDescription: string) {
    return this.apollo.watchQuery<{partByNumDesc: Part[]}> ({
      query: QUERY_LIKE_PART_PN_PD,
      variables: {
        partNumber,
        partDescription
      }
    })
  }

  addPart(addPartFields: AddPartFields) {
    return this.apollo.mutate<{addPart: Part}> ({
      mutation: ADD_PART,
      variables: addPartFields
    })
  }

  editPart(id: string, updates: UpdatePartFields) {
    return this.apollo.mutate<{editPart: Part}> ({
      mutation: EDIT_PART,
      variables: {
        id,
        updates
      }
    })
  }

  deletePart(id: string) {
    return this.apollo.mutate<{deletePart: Part}> ({
      mutation: DELETE_PART,
      variables: {
        id
      }
    })
  }
}
