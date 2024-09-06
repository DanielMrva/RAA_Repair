import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { QUERY_SERIALRADIO, QUERY_SINGLERADIO, ALL_RADIOS, ORG_RADIOS, ADD_RADIO, EDIT_RADIO, QUERY_LIKE_SERIALRADIO, LIKE_ORG_RADIOS, DELETE_RADIO } from '@app/graphql/schemas';
import { Radio } from '@app/graphql/schemas/typeInterfaces';

@Injectable({
  providedIn: 'root'
})
export class RadioService {

  constructor(private apollo: Apollo) { }

  querySerialRadio(serialNumber: string, model: string) {
    return this.apollo.watchQuery<{serialRadio: Radio}> ({
      query: QUERY_SERIALRADIO,
      variables: {
        serialNumber, model
      }
    });
  }

  queryLikeSerialRadio(serialNumber: string, model: string) {
    return this.apollo.watchQuery<{likeSerialRadio: Radio[]}> ({
      query: QUERY_LIKE_SERIALRADIO,
      variables: {
        serialNumber, model
      }
    })
  }

  querySingleRadio(radioID: string) {
    return this.apollo.watchQuery<{radio: Radio}>({
      query: QUERY_SINGLERADIO,
      variables: {
        radioID
      }
    })
  }

  allRadios() {
    return this.apollo.watchQuery<{allRadios: Radio[]}>({
      query: ALL_RADIOS
    });
  }

  orgRadios(orgName: string) {
    return this.apollo.watchQuery<{orgRadios: Radio[]}>({
      query: ORG_RADIOS,
      variables: {
        orgName
      }
    })
  }

  likeOrgRadios(orgName: string) {
    return this.apollo.watchQuery<{likeOrgRadios: Radio[]}>({
      query: LIKE_ORG_RADIOS,
      variables: {
        orgName
      }
    })
  }

  addRadio(
      orgName: string,
      locationName: string,
      datePurchased: string,
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
          locationName,
          datePurchased,
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
      mutation: EDIT_RADIO,
      variables: {id, updates}
    })
  }

  deleteRadio(id: string) {
    return this.apollo.mutate<{deleteRadio: Radio}> ({
      mutation: DELETE_RADIO,
      variables: {id}
    })
  }


}
