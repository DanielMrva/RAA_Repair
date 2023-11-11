import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { QUERY_SERIALRADIO, QUERY_SINGLERADIO, ALL_RADIOS, ORG_RADIOS, ADD_RADIO, Edit_Radio } from '@app/graphql/schemas';
import { Radio } from '@app/graphql/schemas/typeInterfaces';

@Injectable({
  providedIn: 'root'
})
export class RadioService {

  constructor(private apollo: Apollo) { }

  querySerialRadio(serialNumber: string) {
    return this.apollo.watchQuery<{radio: Radio}> ({
      query: QUERY_SERIALRADIO,
      variables: {
        serialNumber
      }
    });
  }

  querySingleRadio(radioId: string) {
    return this.apollo.watchQuery<{radio: Radio}>({
      query: QUERY_SINGLERADIO,
      variables: {
        radioId
      }
    })
  }

  allRadios() {
    console.log('all radios in service')
    return this.apollo.watchQuery<{radios: Radio[]}>({
      query: ALL_RADIOS
    });
  }

  orgRadios(orgName: string) {
    console.log('org radios in service')
    return this.apollo.watchQuery<{orgRadios: Radio[]}>({
      query: ORG_RADIOS,
      variables: {
        orgName
      }
    })
  }

  addRadio(
      orgName: string,
      location: string,
      dateSold: string,
      dateEntered: string,
      inventoryNumber: string,
      make: string,
      model: string,
      progChannels: string,
      notes: string[],
      serialNumber: string,
      warranty: string,
      refurb: boolean,
      radioType: string
    ){
      return this.apollo.mutate<{addRadio: Radio}>({
        mutation: ADD_RADIO,
        variables: {
          orgName,
          location,
          dateSold,
          dateEntered,
          inventoryNumber,
          make,
          model,
          progChannels,
          notes,
          serialNumber,
          warranty,
          refurb,
          radioType
        }
      })

  }

  editRadio(id: string, updates: any) {
    return this.apollo.mutate<{editRadio: Radio}> ({
      mutation: Edit_Radio,
      variables: {id, updates}
    })
    
  }


}
