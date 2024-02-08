import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { LOCATION_NAMES, Location, UpdateLocationFields } from '@app/graphql/schemas';
import { ADD_LOCATION, EDIT_LOCATION } from '@app/graphql/schemas/mutations';
import { QUERY_LOCATIONS, QUERY_SINGLELOCATION, ORG_LOCATIONS } from '@app/graphql/schemas';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private apollo: Apollo) { }

  querySingleLocation(locationId: string) {
    return this.apollo.watchQuery<{location: Location}> ({
      query: QUERY_SINGLELOCATION,
      variables: {
        locationId
      }
    }) 
  };

  allLocations() {
    return this.apollo.watchQuery<{allLocations: Location[]}> ({
      query: QUERY_LOCATIONS
    })
  };

  orgLocations(orgName: string) {
    return this.apollo.watchQuery<{orgLocations: Location[]}> ({
      query: ORG_LOCATIONS,
      variables: {
        orgName
      }
    })
  }

  addLocation(
    locationName: string,
    orgName: string,
    street: string,
    city: string,
    state: string,
    zip: string,
    country: string,
    phone: string,
    contactEmail: string,
    primaryContact: string
  ) {
    return this.apollo.mutate<{addLocation: Location}> ({
      mutation: ADD_LOCATION,
      variables: {
        locationName,
        orgName,
        street,
        city,
        state,
        zip,
        country,
        phone,
        contactEmail,
        primaryContact
      }
    })
  }

  editLocation(id: string, updates: any) {
    return this.apollo.mutate<{editLocation: Location}> ({
      mutation: EDIT_LOCATION,
      variables: {id, updates}
    })
  }

  locationNames() {
    return this.apollo.query<{locationNames: Location[]}> ({
      query: LOCATION_NAMES
    })
  }
  
}
