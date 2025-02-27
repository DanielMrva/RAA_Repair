import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '@app/_store/app.state';
import { loadOrgNames } from '@app/_store/_org-store/org.actions';
import { selectOrgNames } from '@app/_store/_org-store/org.selectors';
import { startWith, switchMap, map, distinctUntilChanged, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-org-selector',
  templateUrl: './org-selector.component.html',
  styleUrls: ['./org-selector.component.css']
})
export class OrgSelectorComponent implements OnInit, OnDestroy {
  @Input() initialOrgName: string = '';
  @Output() orgSelected = new EventEmitter<string>();

  orgControl = new FormControl<string>('', { nonNullable: true });

  orgNames$!: Observable<string[]>;
  filteredOrgNames$!: Observable<string[]>;

  private destroy$ = new Subject<void>(); // Used for cleanup

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.dispatch(loadOrgNames());

    this.orgNames$ = this.store.select(selectOrgNames).pipe(
      map(orgs => orgs.map(org => org.orgName))
    );

    if (this.initialOrgName) {
      this.orgControl.setValue(this.initialOrgName, { emitEvent: false });
    }

    this.filteredOrgNames$ = this.orgControl.valueChanges.pipe(
      startWith(this.initialOrgName || ''),
      distinctUntilChanged(),
      switchMap(value => this.filterOrgNames(value))
    );

    this.orgControl.valueChanges.pipe(
      takeUntil(this.destroy$) // Ensures unsubscription on component destruction
    ).subscribe(value => {
      this.orgSelected.emit(value);
    });
  }

  private filterOrgNames(value: string): Observable<string[]> {
    return this.orgNames$.pipe(
      map(orgs => {
        if (!value) return orgs; // If empty string, return all organizations
        return orgs.filter(org => org.toLowerCase().includes(value.toLowerCase()));
      })
    );
  }
  

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
