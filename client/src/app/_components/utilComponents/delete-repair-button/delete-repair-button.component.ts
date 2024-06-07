import { Component, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { Repair } from '@app/graphql/schemas';
import { deleteRepair } from '@app/_store/_repair-store/repair.actions';
import { ToastService } from '@app/services/toast/toast.service';

@Component({
  selector: 'app-delete-repair-button',
  templateUrl: './delete-repair-button.component.html',
  styleUrls: ['./delete-repair-button.component.css']
})
export class DeleteRepairButtonComponent {

  @Input() repair: Repair;

  constructor(
    private modalService: NgbModal,
    private store: Store,
    private toastService: ToastService
  ) {}

  openModal() {
    this.modalService.open();
  }

  confirmDelete(modal: any) {
    this.store.dispatch(deleteRepair({ id: this.repair._id }));
    modal.close();
  }




}

