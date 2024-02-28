import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { QUERY_SINGLEREPAIR, ALL_REPAIRS, ADD_REPAIR, Edit_Repair } from '@app/graphql/schemas';
import { Repair } from '@app/graphql/schemas/typeInterfaces';

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

  addRepair(
    radioID: string,
    radioMake: string,
    radioSerial: string,
    radioLocation: string,
    dateReceived: string,
    endUserPO: string,
    raaPO: string,
    dateSentTech: string,
    dateRecTech: string,
    dateSentEU: string,
    techInvNum: string,
    raaInvNum: string,
    symptoms: string[],
    testFreq: string,
    incRxSens: string,
    incFreqErr: string,
    incMod: string,
    incPowerOut: string,
    outRxSens: string,
    outFreqErr: string,
    outMod: string,
    outPowerOut: string,
    accessories: string[],
    workPerformed: string[],
    repHours: number,
    partsUsed: string[],
    remarks: string,
  ) {
    return this.apollo.mutate<{addRepair: Repair}> ({
      mutation: ADD_REPAIR,
      variables: {
        radioID,
        radioMake,
        radioSerial,
        radioLocation,
        dateReceived,
        endUserPO,
        raaPO,
        dateSentTech,
        dateRecTech,
        dateSentEU,
        techInvNum,
        raaInvNum,
        symptoms,
        testFreq,
        incRxSens,
        incFreqErr,
        incMod,
        incPowerOut,
        outRxSens,
        outFreqErr,
        outMod,
        outPowerOut,
        accessories,
        workPerformed,
        repHours,
        partsUsed,
        remarks
        }
    })
  }

  editRepair(id: string, updates: any) {
    return this.apollo.mutate<{editRepair: Repair}> ({
        mutation: Edit_Repair,
        variables: {id, updates}
      })

    }
}


