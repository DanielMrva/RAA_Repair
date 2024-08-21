import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DeleteConfirmModalComponent } from '@app/_components/utilComponents/delete-confirm-modal/delete-confirm-modal.component';

@Injectable({
  providedIn: 'root'
})
export class DeleteModalService {
  constructor(private modalService: NgbModal) {}

  openDialog(documentId: string, docType: string) {
    const modalRef = this.modalService.open(DeleteConfirmModalComponent, { centered: true });
    modalRef.componentInstance.documentId = documentId;
    modalRef.componentInstance.docType = docType;

    return modalRef.result;
  }
}
