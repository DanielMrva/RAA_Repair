import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { QUERY_SINGLEREPAIR, ALL_REPAIRS, ADD_REPAIR, EDIT_REPAIR, ORG_REPAIRS, DELETE_REPAIR, REPAIR_BY_TAG, ORG_LOC_REPAIRS } from '@app/graphql/schemas';
import { RepairFormFields, Repair } from '@app/graphql/schemas/typeInterfaces';

@Injectable({
  providedIn: 'root'
})
export class RepairService {

  constructor(private apollo: Apollo) { }

  querySingleRepair(repairID: string) {
    return this.apollo.query<{repair: Repair}>({
      query: QUERY_SINGLEREPAIR,
      variables: {
        repairID
      }
    });
  }

  allRepairs() {
    return this.apollo.query<{allRepairs: Repair[]}>({
      query: ALL_REPAIRS
    });
  }

  orgRepairs(orgName: string) {
    return this.apollo.query<{orgRepairs: Repair[]}>({
      query: ORG_REPAIRS,
      variables: {
        orgName
      }
    })
  }

  orgLocRepairs(orgName: string, locationName: string) {
    return this.apollo.query<{orgLocRepairs: Repair[]}>({
      query: ORG_LOC_REPAIRS,
      variables: {
        orgName,
        locationName
      }
    })
  }
 
  repairByTag(startTag?: number, endTag?: number) {
    return this.apollo.query<{repairByTag: Repair[]}>({
      query: REPAIR_BY_TAG,
      variables: {
        startTag: startTag, 
        endTag: endTag
      }
    })
  }

  addRepair( addRepairFields: RepairFormFields ) {
    return this.apollo.mutate<{addRepair: Repair}> ({
      mutation: ADD_REPAIR,
      variables: addRepairFields
    })
  }

  editRepair(id: string, updates: any) {
    return this.apollo.mutate<{editRepair: Repair}> ({
        mutation: EDIT_REPAIR,
        variables: {id, updates}
      })

  }

  deleteRepair(id: string) {
    return this.apollo.mutate<{deleteRepair: Repair}> ({
      mutation: DELETE_REPAIR,
      variables: {id}
    })
  }


}


