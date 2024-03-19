import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith, switchMap } from 'rxjs/operators';
// import { FilterService } from '@app/services/utilityServices/filter.service';
import { FilterService}
import { Store } from '@ngrx/store';
import { AppState } from '@app/_store/app.state';
import { loadOrgNames, loadLocationNames } from '@app/_store/actions';
import { selectOrgNames, selectLocationNames } from '@app/_store/selectors';

@Component({
  selector: 'app-org-location-selector',
  templateUrl: './org-location-selector.component.html',
  styleUrls: ['./org-location-selector.component.scss']
})
export class OrgLocationSelectorComponent implements OnInit {
  @Output() orgNameSelected = new EventEmitter<string>();
  @Output() filteredLocations = new EventEmitter<string[]>();

  orgNames$: Observable<string[]>;
  locationNames$: Observable<Location[]>;
  filteredOrgNames$: Observable<string[]>;
  filteredLocNames$: Observable<string[]>;

  selectorForm: FormGroup = new FormGroup({
    orgName: new FormControl(''),
    radioLocation: new FormControl(''),
  });

  constructor(private filterService: FilterService, private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.dispatch(loadOrgNames());
    this.orgNames$ = this.store.select(selectOrgNames);
    this.locationNames$ = this.store.select(selectLocationNames);

    this.filteredOrgNames$ = this.selectorForm.controls.orgName.valueChanges.pipe(
      startWith(''),
      switchMap(value => this.filterService.filterOrgs(value, this.orgNames$))
    );

    this.filteredLocNames$ = combineLatest([
      this.selectorForm.controls.radioLocation.valueChanges.pipe(startWith('')),
      this.selectorForm.controls.orgName.valueChanges,
      this.locationNames$,
    ]).pipe(
      map(([locName, orgName, locations]) => this.filterService.filteredLocs(locName, orgName, locations))
    );

    // Emit the selected orgName for parent components
    this.selectorForm.controls.orgName.valueChanges.subscribe(orgName => {
      this.orgNameSelected.emit(orgName);
    });

    // Emit the filtered location names for parent components
    this.filteredLocNames$.subscribe(locations => {
      this.filteredLocations.emit(locations);
    });
  }
}
