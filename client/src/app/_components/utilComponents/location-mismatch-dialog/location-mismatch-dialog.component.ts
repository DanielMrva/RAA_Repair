import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { editRadio } from '@app/_store/_radio-store/radio.actions';
import { UpdateRadioFields } from '@app/graphql/schemas';

@Component({
  selector: 'app-location-mismatch-dialog',
  templateUrl: './location-mismatch-dialog.component.html',
})
export class LocationMismatchDialogComponent {
  @Input() newLocation!: string;
  @Input() oldLocation!: string;
  @Input() radioID!: string;

  constructor(public activeModal: NgbActiveModal, private store: Store) {}

  confirmUpdate() {

    console.log('LMD.confirmUpdate()')

    const updates: UpdateRadioFields = {
      locationName: this.newLocation
    }

    this.store.dispatch(editRadio({id: this.radioID, updates}))
    this.activeModal.close('Update confirmed');
  }

  submitWithoutUpdate() {
    console.log('LMD.submitWithoutUpdate()')

    this.activeModal.close('submit');
  }

  cancel() {
    console.log('LMD.cancel()')

    this.activeModal.dismiss('cancel');
  }
}
