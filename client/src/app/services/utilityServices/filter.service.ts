import { Injectable } from '@angular/core';
import { Organization, Location, Radio, Repair } from '@app/graphql/schemas/typeInterfaces';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  
  filterOrgs(value: string, orgNames$: Observable<Organization[]>): Observable<string[]> {
    const filterValue = value.toLowerCase();

    return orgNames$.pipe(
      map(orgList => orgList
        .map(org => org.orgName)
        .filter(orgName => orgName.toLowerCase().includes(filterValue))
      )
    );
  }

  filteredLocs(locValue: string | null, orgName: string | null, locations: Location[]): string[] {
    const filteredLocValue = (locValue || '').toLowerCase();
    const org = (orgName || '').toLowerCase();

    return locations.filter(loc => 
      loc.locationName.toLowerCase().includes(filteredLocValue) && loc.orgName.toLowerCase() === org
    ).map(loc => loc.locationName);
  }

  constructor() { }
}
