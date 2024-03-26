import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith, switchMap, tap } from 'rxjs/operators';
import { FilterService } from '@app/services/utilityServices/filter.service';
import { Store } from '@ngrx/store';
import { AppState } from '@app/_store/app.state';
import { loadLocationNames} from '@app/_store/_location-store/location.actions';
import { selectLocationNames } from '@app/_store/_location-store/location.selectors';
import { loadOrgNames} from '@app/_store/_org-store/org.actions';
import { selectOrgNames } from '@app/_store/_org-store/org.selectors';
import { Location, Organization } from '@app/graphql/schemas/typeInterfaces';


@Component({
  selector: 'app-org-location-selector',
  templateUrl: './org-location-selector.component.html',
  styleUrls: ['./org-location-selector.component.css']
})
export class OrgLocationSelectorComponent implements OnInit {
  @Input() initialOrgName: string | null = null;
  @Output() orgNameSelected = new EventEmitter<string>();
  @Output() filteredLocations = new EventEmitter<string[]>();

  orgNames$!: Observable<string[]>;
  locationNames$!: Observable<Location[]>;

  filteredOrgNames$!: Observable<string[]>;
  filteredLocNames$!: Observable<string[]>;

  orgNameControl = new FormControl<string>('');

  constructor(
    private filterService: FilterService, 
    private store: Store<AppState>
    ) {}

  ngOnInit(): void {
    this.store.dispatch(loadOrgNames());
    this.store.dispatch(loadLocationNames());

    this.orgNames$ = this.store.select(selectOrgNames).pipe(
      map(orgs => orgs.map(org => org.orgName))
    );
    this.locationNames$ = this.store.select(selectLocationNames);

      // Pre-select orgName if initialOrgName is provided
      if (this.initialOrgName) {
        this.orgNameControl.setValue(this.initialOrgName);
      }
  
      // Emit orgName on selection change
      this.orgNameControl.valueChanges.pipe(
        startWith(this.initialOrgName || ',')
      ).subscribe(value => {
        const nonNullable = value ?? '';
        this.orgNameSelected.emit(nonNullable);
        this.filterLocations(nonNullable);
      })
  
      // Initial filtering if initialOrgName is provided
      this.filterLocations(this.initialOrgName || '');

      this.filteredOrgNames$ = this.orgNameControl.valueChanges.pipe(
        startWith(''),
        switchMap(value => 
          this.filterService.filterOrgs(value ?? '', this.orgNames$)
        )
      );

    }

    private filterLocations(orgName: string): void {
      // Assuming filteredLocs correctly returns Observable<string[]>
      this.locationNames$.pipe(
        switchMap(locations => this.filterService.filteredLocs('', orgName, locations)),
        tap(filteredLocations => {
          // Make sure filteredLocations is string[]
          this.filteredLocations.emit(filteredLocations); // filteredLocations should already be string[]
        })
      ).subscribe();
    }
    
  
}
