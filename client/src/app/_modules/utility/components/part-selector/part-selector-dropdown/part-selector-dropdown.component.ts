import { Component, Input, Output, OnInit, OnDestroy, EventEmitter } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Observable, of, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '@app/_store/app.state';
import { loadAllParts } from '@app/_store/_part-store/part.actions';
import { selectAllParts } from '@app/_store/_part-store/part.selectors';
import { Part } from '@app/graphql/schemas';
import { map, startWith, switchMap } from 'rxjs/operators';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-part-selector-dropdown',
  templateUrl: './part-selector-dropdown.component.html',
  styleUrls: ['./part-selector-dropdown.component.css']
})
export class PartSelectorDropdownComponent implements OnInit, OnDestroy {

  @Input() initialPartsUsed: string[] = [];
  @Output() partsUsedChange = new EventEmitter<string[]>();

  partsDropdownForm = new FormGroup({
    partsArray: new FormArray([new FormControl<string>('', { nonNullable: true })])
  });

  parts$: Observable<string[]> = of([]);
  filteredParts$: Observable<string[]>[] = [];  // Array of filtered observables for each control

  private subscriptions = new Subscription();

  constructor(
    private store: Store<AppState>,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.store.dispatch(loadAllParts());
    this.parts$ = this.store.select(selectAllParts).pipe(
      map(parts => parts.map(part => `${part.partNumber} - ${part.description}`))
    );
    
    this.initPartsArray(this.initialPartsUsed);
  }

  initPartsArray(parts: string[]): void {
    const partsArray = this.partsDropdownForm.get('partsArray') as FormArray;
    partsArray.clear();
    parts.forEach(part => partsArray.push(new FormControl(part, { nonNullable: true })));
    
    // Initialize filteredParts$ for each control
    this.filteredParts$ = partsArray.controls.map((control) =>
      control.valueChanges.pipe(
        startWith(''),
        switchMap(value => this.parts$.pipe(
          map(parts => this.filterParts(parts, value))
        ))
      )
    );

    this.emitPartsUsedChange();  // Emit only on initialization
  }

  get formControls(): FormControl[] {
    return (this.partsDropdownForm.controls.partsArray.controls as FormControl[]);
  }

  addPart(event: Event): void {
    event.stopPropagation();
    const partsArray = this.partsDropdownForm.get('partsArray') as FormArray;
    const newControl = new FormControl('', { nonNullable: true }); //Add a new form control instance
    // Add a new filtered observable for the added control
    const newFiltered$ = newControl.valueChanges.pipe(
      startWith(''),
      switchMap(value => this.parts$.pipe(
        map(parts => this.filterParts(parts, value))
      ))
    );
    this.filteredParts$.push(newFiltered$);
    partsArray.push(newControl); //Pushes the form control to the form array
    this.emitPartsUsedChange(); //Emit change up to parent component
  }

  removePart(event: Event, index: number): void {
    const partsArray = this.partsDropdownForm.get('partsArray') as FormArray;
    partsArray.removeAt(index);
    this.filteredParts$.splice(index, 1);  // Remove the corresponding filtered observable
    this.emitPartsUsedChange(); //Emit change up to parent component
  }

  onOptionSelected(event: any, index: number): void {
    if (event) {
      const partsArray = this.partsDropdownForm.get('partsArray') as FormArray;
      const selectedValue = event.option.value;

      const selectedPart = event.option.value as Part;

      partsArray.at(index).setValue(`${selectedValue}`);  // Update the specific control with selected value
      this.emitPartsUsedChange();  // Emit change to parent component
    }
  }
  

  emitPartsUsedChange(): void {
    const partsArray = this.partsDropdownForm.get('partsArray') as FormArray;
    this.partsUsedChange.emit(partsArray.value); // Emits an array of strings
  }

  private filterParts(parts: string[], filterValue: string | null): string[] {
    const searchText = (filterValue || '').toLowerCase();
    return parts.filter(partString =>
      partString.toLowerCase().includes(searchText)
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
