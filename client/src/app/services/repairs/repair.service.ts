import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { QUERY_SINGLEREPAIR, ALL_REPAIRS, ADD_REPAIR, Edit_Repair } from '@app/graphql/schemas';
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

  addRepair( addRepairFields: RepairFormFields ) {
    return this.apollo.mutate<{addRepair: Repair}> ({
      mutation: ADD_REPAIR,
      variables: addRepairFields
    })
  }

  editRepair(id: string, updates: any) {
    return this.apollo.mutate<{editRepair: Repair}> ({
        mutation: Edit_Repair,
        variables: {id, updates}
      })

    }
}


