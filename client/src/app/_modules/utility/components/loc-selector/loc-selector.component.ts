import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '@app/_store/app.state';
import { loadLocationNames } from '@app/_store/_location-store/location.actions';
import { selectLocationNames } from '@app/_store/_location-store/location.selectors';
import { switchMap, map, distinctUntilChanged, takeUntil, startWith } from 'rxjs/operators';
import { Location } from '@app/graphql/schemas';

@Component({
  selector: 'app-loc-selector',
  templateUrl: './loc-selector.component.html',
  styleUrls: ['./loc-selector.component.css']
})
export class LocSelectorComponent implements OnInit, OnDestroy{


  @Input() initialLocName: string = '';
  @Input() orgName!: string;
  @Output() locSelected = new EventEmitter<string>();

  locControl = new FormControl<string>('', {nonNullable: true});
  locations$!: Observable<Location[]>;
  filteredLocations$!: Observable<string[]>

  private destroy$ = new Subject<void>(); 

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.dispatch(loadLocationNames());
    
    this.locations$ = this.store.select(selectLocationNames);

    if (this.initialLocName) {
      this.locControl.setValue(this.initialLocName, { emitEvent: false });
    }

    this.filteredLocations$ = this.locControl.valueChanges.pipe(
      startWith(this.initialLocName ||''),
      distinctUntilChanged(),
      switchMap(value => this.filterLocations(value, this.orgName))
    );

    this.locControl.valueChanges.pipe(
      takeUntil(this.destroy$)
    ).subscribe(value => {
      this.locSelected.emit(value);
    });

  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['orgName'] && changes['orgName'].currentValue) {
      this.filteredLocations$ = this.locControl.valueChanges.pipe(
        startWith(''),
        distinctUntilChanged(),
        switchMap(value => this.filterLocations(value, this.orgName))
      );
    }
  
    if (changes['initialLocName'] && changes['initialLocName'].currentValue) {
      this.locControl.setValue(this.initialLocName, { emitEvent: false });
    }
  }
  
  

  private updateFilteredLocations(): void {
    this.filteredLocations$ = this.locControl.valueChanges.pipe(
      startWith(''),
      distinctUntilChanged(),
      switchMap(value => this.filterLocations(value, this.orgName))
    );
  }

  private filterLocations(value: string, orgName: string): Observable<string[]> {
    return this.locations$.pipe(
      map(locations => {
        if (!orgName) return []; // Prevents filtering when no org is selected
        return locations
          .filter(loc => loc.orgName === orgName)
          .map(loc => loc.locationName)
          .filter(name => name.toLowerCase().includes(value.toLowerCase()));
      })
    );
  }
  

  ngOnDestroy(): void {
      this.destroy$.next();
      this.destroy$.complete();
  }
}
