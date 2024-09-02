import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-deletion-modal',
  templateUrl: './deletion-modal.component.html',
  styleUrls: ['./deletion-modal.component.css']
})
export class DeletionModalComponent {

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
