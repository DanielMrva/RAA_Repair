import { Component, EventEmitter, OnInit, Input, Output, OnChanges, SimpleChanges, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, of, Subject } from 'rxjs';
import { distinctUntilChanged, map, shareReplay, startWith, switchMap, takeUntil, tap } from 'rxjs/operators';
import { FilterService } from '@app/services/utilityServices/filter.service';
import { Store } from '@ngrx/store';
import { AppState } from '@app/_store/app.state';
import { loadLocationNames } from '@app/_store/_location-store/location.actions';
import { selectLocationNames } from '@app/_store/_location-store/location.selectors';
import { loadOrgNames } from '@app/_store/_org-store/org.actions';
import { selectOrgNames } from '@app/_store/_org-store/org.selectors';
import { Location } from '@app/graphql/schemas/typeInterfaces';

@Component({
  selector: 'app-org-loc-selector',
  templateUrl: './org-loc-selector.component.html',
  styleUrls: ['./org-loc-selector.component.css']
})
export class OrgLocSelectorComponent implements OnInit, OnChanges, OnDestroy {

  @Input() initialOrgName: string | null = null;
  @Input() orgNameControl!: FormControl;
  @Output() orgNameSelected = new EventEmitter<string>();
  @Output() filteredLocations = new EventEmitter<string[]>();

  orgNames$!: Observable<string[]>;
  locationNames$: Observable<Location[]> = of([]);

  filteredOrgNames$!: Observable<string[]>;
  filteredLocNames$!: Observable<string[]>;

  constructor(
    private filterService: FilterService,
    private store: Store<AppState>,
    private cdr: ChangeDetectorRef
  ) {

  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngOnInit(): void {
    this.store.dispatch(loadOrgNames());

    this.orgNames$ = this.store.select(selectOrgNames).pipe(
      map(orgs => orgs.map(org => org.orgName))
    );
    this.locationNames$ = this.store.select(selectLocationNames).pipe(shareReplay(1));

    this.setupValueChanges();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['initialOrgName'] && changes['initialOrgName'].currentValue) {
      if (this.orgNameControl.value !== this.initialOrgName) {
        this.orgNameControl.patchValue(this.initialOrgName, { emitEvent: false });
        this.orgNameSelected.emit(this.initialOrgName!);
      }
      this.filterLocations(this.initialOrgName!);
      this.cdr.detectChanges();
    }

  };

  private destroy$ = new Subject<void>()

  private setupValueChanges(): void {
    this.orgNameControl.valueChanges.pipe(
      distinctUntilChanged(),
      startWith(this.initialOrgName || ''),
      tap(value => {
        const nonNullable = value ?? '';
        this.orgNameSelected.emit(nonNullable);
        this.filterLocations(nonNullable);
      }),
      takeUntil(this.destroy$)
    ).subscribe();
  
    this.filteredOrgNames$ = this.orgNameControl.valueChanges.pipe(
      startWith(''),
      switchMap(value =>
        this.filterService.filterStrings(value ?? '', this.orgNames$)
      )
    );
  }
  

  private filterLocations(orgName: string): void {
    this.filteredLocNames$ = this.locationNames$.pipe(
      switchMap(locations => this.filterService.filteredLocs('', orgName, locations)),
      distinctUntilChanged()
    );
  }



}
