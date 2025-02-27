import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { Store } from '@ngrx/store';
import { addPart, editPart } from '@app/_store/_part-store/part.actions';
import { AddPartFields, Part } from '@app/graphql/schemas';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { selectAllParts } from '@app/_store/_part-store/part.selectors';
import { first, map } from 'rxjs/operators';
import { AppState } from '@app/_store/app.state';

@Component({
  selector: 'app-add-part-modal-form',
  templateUrl: './add-part-modal-form.component.html',
  styleUrls: ['./add-part-modal-form.component.css']
})
export class AddPartModalFormComponent implements OnInit {
  @Output() partAdded = new EventEmitter<string>();
  @Output() modalClosed = new EventEmitter<void>();
  @Input() partID?: string;

  partsList: Part[] = [];

  partForm = new FormGroup({
    partNumber: new FormControl<string>('', Validators.required),
    description: new FormControl<string>('', Validators.required),
    manufacturer: new FormControl<string>(''),
    cost: new FormControl<number>(0),
    msrp: new FormControl<number>(0)
  });

  constructor(
    private store: Store<AppState>,
    private activeModal: NgbActiveModal
  ) {}

  ngOnInit(): void {
    // Populate partsList and set edit mode if partID is provided
    this.store.select(selectAllParts)
      .pipe(first())
      .subscribe(parts => {
        this.partsList = parts;

      });

      if (this.partID) {
        this.setEditMode(this.partID);
      }


  }

  private setEditMode(partID: string): void {
    const partToEdit = this.partsList.find(part => part._id === partID);
    if (partToEdit) {
      this.partForm.patchValue({
        partNumber: partToEdit.partNumber,
        description: partToEdit.description,
        manufacturer: partToEdit.manufacturer,
        cost: partToEdit.cost || 0,
        msrp: partToEdit.msrp || 0
      });
    }
  }

  submitForm(): void {
    if (this.partForm.valid) {
      const partData = this.partForm.value;

      if (!this.partID) {
        if (this.isDuplicatePartNumber(partData.partNumber || '')) {
          alert('Part number already exists');
          return;
        }

        if (this.isDuplicateDescription(partData.description || '', partData.partNumber || '')) {
          alert('Part description already exists');
          return;
        }
      }

      const partFields: AddPartFields = {
        partNumber: partData.partNumber ?? '',
        description: partData.description ?? '',
        manufacturer: partData.manufacturer ?? '',
        cost: partData.cost ?? 0,
        msrp: partData.msrp ?? 0
      };

      if (this.partID) {
        this.store.dispatch(editPart({ id: this.partID, updates: partFields }));
        this.activeModal.close(`Updated ${partData.partNumber} - ${partData.description}`);
      } else {
        this.store.dispatch(addPart({ addPartFields: partFields }));
        const concatenatedValue = `${partData.partNumber} - ${partData.description}`;
        this.partAdded.emit(concatenatedValue);
        this.activeModal.close(concatenatedValue);
      }
    }
  }

  isDuplicatePartNumber(partNumber: string): boolean {
    return this.partsList.some(
      part => part.partNumber.toLowerCase() === partNumber.toLowerCase()
    );
  }

  isDuplicateDescription(description: string, partNumber: string): boolean {
    return this.partsList.some(
      part =>
        part.description.toLowerCase() === description.toLowerCase() &&
        part.partNumber.toLowerCase() === partNumber.toLowerCase()
    );
  }

  closeModal(): void {
    this.modalClosed.emit();
    this.activeModal.close();
  }

  cancel(): void {
    this.activeModal.dismiss();
  }
}
