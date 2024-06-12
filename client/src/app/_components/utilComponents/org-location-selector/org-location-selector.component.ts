import { Component, EventEmitter, OnInit, Input, Output, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { map, startWith, switchMap, tap } from 'rxjs/operators';
import { FilterService } from '@app/services/utilityServices/filter.service';
import { Store } from '@ngrx/store';
import { AppState } from '@app/_store/app.state';
import { loadLocationNames } from '@app/_store/_location-store/location.actions';
import { selectLocationNames } from '@app/_store/_location-store/location.selectors';
import { loadOrgNames } from '@app/_store/_org-store/org.actions';
import { selectOrgNames } from '@app/_store/_org-store/org.selectors';
import { Location } from '@app/graphql/schemas/typeInterfaces';

@Component({
  selector: 'app-org-location-selector',
  templateUrl: './org-location-selector.component.html',
  styleUrls: ['./org-location-selector.component.css']
})
export class OrgLocationSelectorComponent implements OnInit, OnChanges {
  @Input() initialOrgName: string | null = null;
  @Output() orgNameSelected = new EventEmitter<string>();
  @Output() filteredLocations = new EventEmitter<string[]>();

  orgNames$!: Observable<string[]>;
  locationNames$: Observable<Location[]> = of([]);  // Initialize with an empty observable

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

    // Subscribe to value changes to emit the orgName and filter locations
    this.orgNameControl.valueChanges.pipe(
      startWith(this.initialOrgName || ''),
      tap(value => {
        const nonNullable = value ?? '';
        this.orgNameSelected.emit(nonNullable);
        this.filterLocations(nonNullable);
      })
    ).subscribe();

    this.filteredOrgNames$ = this.orgNameControl.valueChanges.pipe(
      startWith(''),
      switchMap(value => 
        this.filterService.filterOrgs(value ?? '', this.orgNames$)
      )
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['initialOrgName'] && changes['initialOrgName'].currentValue) {
      this.orgNameControl.patchValue(this.initialOrgName, { emitEvent: false });
      this.orgNameSelected.emit(this.initialOrgName!);
      this.filterLocations(this.initialOrgName!);
    }
  }

  private filterLocations(orgName: string): void {
    if (!this.locationNames$) {
      return;
    }

    this.locationNames$.pipe(
      switchMap(locations => this.filterService.filteredLocs('', orgName, locations)),
      tap(filteredLocations => {
        this.filteredLocations.emit(filteredLocations);
      })
    ).subscribe();
  }
}
