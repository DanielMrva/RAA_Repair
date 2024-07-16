import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { DeleteConfirmModalComponent } from '@app/_components/utilComponents/delete-confirm-modal/delete-confirm-modal.component'

@Injectable({
  providedIn: 'root'
})
export class DeleteModalService {
  constructor(private modalService: NgbModal) {}

  openDialog(repairId: string) {
    const modalRef = this.modalService.open(DeleteConfirmModalComponent, { centered: true });
    modalRef.componentInstance.repairId = repairId;

    return modalRef.result;
  }
}
