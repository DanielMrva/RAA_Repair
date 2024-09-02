import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { editRadio } from '@app/_store/_radio-store/radio.actions';
import { UpdateRadioFields } from '@app/graphql/schemas';

@Component({
  selector: 'app-location-mismatch-modal',
  templateUrl: './location-mismatch-modal.component.html',
  styleUrls: ['./location-mismatch-modal.component.css']
})
export class LocationMismatchModalComponent {

  @Input() newLocation!: string;
  @Input() oldLocation!: string;
  @Input() radioID!: string;

  constructor(public activeModal: NgbActiveModal, private store: Store) {}

  confirmUpdate() {

    const updates: UpdateRadioFields = {
      locationName: this.newLocation
    }

    this.store.dispatch(editRadio({id: this.radioID, updates}))
    this.activeModal.close('Update confirmed');
  }

  submitWithoutUpdate() {

    this.activeModal.close('submit');
  }

  cancel() {
    console.log('LMD.cancel()')

    this.activeModal.dismiss('cancel');
  }


}
