import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Store } from '@ngrx/store';
import { addPart } from '@app/_store/_part-store/part.actions';
import { AddPartFields } from '@app/graphql/schemas';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-part-modal-form',
  templateUrl: './add-part-modal-form.component.html',
  styleUrls: ['./add-part-modal-form.component.css']
})
export class AddPartModalFormComponent {

  @Output() partAdded = new EventEmitter<string>();
  @Output() modalCloased = new EventEmitter<void>();

  addPartForm = new FormGroup({
    partNumber: new FormControl<string>('', Validators.required),
    description: new FormControl<string>('', Validators.required),
    manufacturer: new FormControl<string>(''),
    cost: new FormArray([ new FormControl<number>(0)]),
    msrp: new FormControl<number>(0)
  });

  constructor(
    private store: Store,
    private activeModal: NgbActiveModal
  ) {}

  submitForm() {
    if (this.addPartForm.valid) {
      const partData = this.addPartForm.value;
      console.log(partData)
      const addPartFields: AddPartFields = {
        partNumber: partData.partNumber ?? '',
        description: partData.description ?? '',
        manufacturer: partData.manufacturer ?? '',
        cost: Array.isArray(partData.cost)
        ? (partData.cost.filter((value) => typeof value === 'number') as number[])
        : [partData.cost ?? 0],        
        msrp: partData.msrp ?? 0
      }
      const concatenatedValue = `${partData.partNumber} - ${partData.description}`;
      this.store.dispatch(addPart({addPartFields}));
      this.partAdded.emit(concatenatedValue);
      this.activeModal.close(concatenatedValue);
    }
  }

  closeModal(): void {
    this.modalCloased.emit();
    this.activeModal.close();
  };

  cancel(): void {
    this.activeModal.dismiss();
  }

}
