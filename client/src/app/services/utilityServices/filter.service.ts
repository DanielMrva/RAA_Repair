import { Injectable } from '@angular/core';
import { Organization, Location, Radio, Repair } from '@app/graphql/schemas/typeInterfaces';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  
  filterOrgs(value: string, orgNames$: Observable<string[]>): Observable<string[]> {
    const filterValue = value.toLowerCase();

    return orgNames$.pipe(
      map(orgList => orgList

        .filter(orgName => orgName.toLowerCase().includes(filterValue))
      )
    );
  }

  filteredLocs(locValue: string | null, orgName: string | null, locations: Location[]): Observable<string[]> {
    const filteredLocValue = (locValue || '').toLowerCase();
    const org = (orgName || '').toLowerCase();

    // Perform the filtering and mapping synchronously, but wrap the result with 'of' to return an Observable
    const filteredLocations = locations.filter(loc =>
      loc.locationName.toLowerCase().includes(filteredLocValue) && loc.orgName.toLowerCase() === org
    ).map(loc => loc.locationName);

    return of(filteredLocations); // 'of' creates an Observable from the array
  }

  constructor() { }
}
