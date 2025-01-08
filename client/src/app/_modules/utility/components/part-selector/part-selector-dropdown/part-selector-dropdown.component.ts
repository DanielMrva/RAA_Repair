import { Component, Input, Output, OnInit, OnDestroy, EventEmitter } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { Observable, of, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '@app/_store/app.state';
import { loadAllParts } from '@app/_store/_part-store/part.actions';
import { selectAllParts } from '@app/_store/_part-store/part.selectors';
import { map, startWith, switchMap } from 'rxjs/operators';
import { AddPartModalService } from '@app/services/modal/add-part-modal.service';
import { AccessControlService } from '@app/services/accessControl/access-control.service';
import { AccessLevel } from '@app/utils/constants';

@Component({
  selector: 'app-part-selector-dropdown',
  templateUrl: './part-selector-dropdown.component.html',
  styleUrls: ['./part-selector-dropdown.component.css']
})
export class PartSelectorDropdownComponent implements OnInit, OnDestroy {

  @Input() initialPartsUsed: string[] = [];
  @Output() partsUsedChange = new EventEmitter<string[]>();

  private editableFields: Record<AccessLevel, string[]> = {
    admin: ['*'],
    tech: ['*'],
    user: [],
  };

  partsDropdownForm = new FormGroup({
    partsArray: new FormArray([new FormControl<string>('', { nonNullable: true })])
  });

  showModal = false;
  parts$: Observable<string[]> = of([]);
  filteredParts$: Observable<string[]>[] = [];  // Array of filtered observables for each control
  private subscriptions = new Subscription();

  constructor(
    private store: Store<AppState>,
    private addPartModalService: AddPartModalService,
    private accessControlService: AccessControlService
  ) { }

  ngOnInit(): void {
    this.store.dispatch(loadAllParts());
    this.parts$ = this.store.select(selectAllParts).pipe(
      map(parts => parts.map(part => `${part.partNumber} - ${part.description}`))
    );

    this.initPartsArray(this.initialPartsUsed);

    this.accessControlService.setFormControlsAccessibility(
      this.partsDropdownForm,
      this.editableFields
    );
  }

  get formControls(): FormControl[] {
    return (this.partsDropdownForm.get('partsArray') as FormArray).controls as FormControl[];
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

  addPart(event: Event): void {
    event.stopPropagation();
    const partsArray = this.partsDropdownForm.get('partsArray') as FormArray;
    const newControl = new FormControl('', { nonNullable: true });
    partsArray.push(newControl);
    this.filteredParts$.push(
      newControl.valueChanges.pipe(
        startWith(''),
        switchMap(value => this.parts$.pipe(
          map(parts => this.filterParts(parts, value))
        ))
      )
    );
    this.emitPartsUsedChange();
  }

  removePart(event: Event, index: number): void {
    event.stopPropagation();
    const partsArray = this.partsDropdownForm.get('partsArray') as FormArray;
    partsArray.removeAt(index);
    this.filteredParts$.splice(index, 1);
    this.emitPartsUsedChange();
  }

  onOptionSelected(event: any, index: number): void {
    const selectedValue = event.option.value;
    const partsArray = this.partsDropdownForm.get('partsArray') as FormArray;

    if (selectedValue === 'other') {
      partsArray.at(index).setValue('Other: '); // Set "Other" as a placeholder
    } else if (selectedValue === 'admin-other') {
      this.addPartModalService.openDialog().then((newPart) => {
        if (newPart) {
          partsArray.at(index).setValue(newPart); // Update the dropdown with the new part
          this.store.dispatch(loadAllParts()); // Reload parts to include the new one
          this.emitPartsUsedChange(); // Emit the updated array
        }
      });
    } else {
      partsArray.at(index).setValue(selectedValue);
      this.emitPartsUsedChange();
    }
  }


  onOtherPartInput(event: Event, index: number): void {
    const input = (event.target as HTMLInputElement).value;
    const partsArray = this.partsDropdownForm.get('partsArray') as FormArray;

    partsArray.at(index).setValue(`Other: ${input}`);
    this.emitPartsUsedChange();
  }

  isOtherSelected(index: number): boolean {
    const value = this.partsDropdownForm.get('partsArray')?.value[index] || '';
    return value.startsWith('Other:');
  }

  openModal() {
    this.showModal = true;
  };

  emitPartsUsedChange(): void {
    const partsArray = this.partsDropdownForm.get('partsArray') as FormArray;
    Promise.resolve().then(() => {
      this.partsUsedChange.emit(partsArray.value.filter((part: string) => part));
    });
  }

  private filterParts(parts: string[], filterValue: string | null): string[] {
    const searchText = (filterValue || '').toLowerCase();
    return parts.filter(part => part.toLowerCase().includes(searchText));
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
