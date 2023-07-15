import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { QUERY_SINGLEREPAIR, ALL_REPAIRS, ADD_REPAIR } from '@app/graphql/schemas';
import { Repair } from '@app/graphql/schemas/typeInterfaces';

@Injectable({
  providedIn: 'root'
})
export class RerpairService {

  constructor(private apollo: Apollo) { }

  querySingleRepair(repairId: string) {
    return this.apollo.query<{repair: Repair}>({
      query: QUERY_SINGLEREPAIR,
      variables: {
        repairId
      }
    });
  }

  allRepairs() {
    return this.apollo.query({
      query: ALL_REPAIRS
    });
  }

  addRepair(
    radioSerial: string,
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
        radioSerial,
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

}
