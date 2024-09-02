import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DeletionModalComponent } from '@app/_modules/utility/components/deletion-modal/deletion-modal.component';

@Injectable({
  providedIn: 'root'
})
export class DeleteModalService {
  constructor(private modalService: NgbModal) {}

  openDialog(documentId: string, docType: string) {
    const modalRef = this.modalService.open(DeletionModalComponent, { centered: true });
    modalRef.componentInstance.documentId = documentId;
    modalRef.componentInstance.docType = docType;

    return modalRef.result;
  }
}
