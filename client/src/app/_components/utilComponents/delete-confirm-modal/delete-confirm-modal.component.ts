import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-delete-confirm-modal',
  templateUrl: './delete-confirm-modal.component.html',
  styleUrls: ['./delete-confirm-modal.component.css']
})
export class DeleteConfirmModalComponent {

  @Input() documentId!: string;
  @Input() docType!: string;

  constructor(public activeModal: NgbActiveModal) {}

  confirmDelete(copy: boolean): void {
    this.activeModal.close({ delete: true, copy });
  }

  cancel(): void {
    this.activeModal.dismiss();
  }

}
