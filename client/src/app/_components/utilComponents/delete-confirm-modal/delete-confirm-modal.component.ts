import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { ToastService } from '@app/services/toast/toast.service';
import { Repair } from '@app/graphql/schemas';
import { deleteRepair } from '@app/_store/_repair-store/repair.actions';

@Component({
  selector: 'app-delete-confirm-modal',
  templateUrl: './delete-confirm-modal.component.html',
  styleUrls: ['./delete-confirm-modal.component.css']
})
export class DeleteConfirmModalComponent {

  @Input() repair!: Repair;
  
  constructor(
    public activeModal: NgbActiveModal, 
    private store: Store,
    private toastService: ToastService
  
  ) {}

  confirmDelete(){
    console.log(`DCM.confirmDelete()`);

    this.store.dispatch(deleteRepair({id: this.repair._id}));

    this.activeModal.close('Delete Confirmed');
  };

  copyToClipboard() {
    const text = JSON.stringify(this.repair, null, 2);
    navigator.clipboard.writeText(text).then(() => {
      this.toastService.show(`Repair ${this.repair._id} coppied to clipboard.`)
    });
  };

  cancel() {
    console.log('DCM.cancel()')

    this.activeModal.dismiss('cancel')
  }



}
