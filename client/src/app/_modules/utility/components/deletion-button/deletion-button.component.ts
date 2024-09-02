import { Component, Input } from '@angular/core';
import { DeleteDocumentService } from '@app/services/utilityServices/delete-document.service';
import { DeleteModalService } from '@app/services/modal/delete-modal.service';
import { ToastService } from '@app/services/toast/toast.service';

@Component({
  selector: 'app-deletion-button',
  templateUrl: './deletion-button.component.html',
  styleUrls: ['./deletion-button.component.css']
})
export class DeletionButtonComponent {

  @Input() document: any;
  @Input() docType!: string;

  constructor(
    private documentService: DeleteDocumentService,
    private deleteModalService: DeleteModalService,
    private toastService: ToastService
  ) {}

  async openDeleteConfirmation($event: Event) {
    $event.stopPropagation();
    $event.preventDefault();

    try {
      const result = await this.deleteModalService.openDialog(this.document._id, this.docType);

      if (result?.delete) {
        if (result.copy) {
          this.copyToClipboard(this.document);
        }
        this.confirmDeleteDocument(this.document);
      }
    } catch (error) {
      console.log('Deletion cancelled', error);
    }
  }

  confirmDeleteDocument(document: any): void {
    this.documentService.deleteDocument(this.docType, document._id);
  }

  copyToClipboard(document: any) {
    const text = JSON.stringify(document, null, 2);
    navigator.clipboard.writeText(text).then(() => {
      this.toastService.show(`${this.docType.charAt(0).toUpperCase() + this.docType.slice(1)} ${document._id} copied to clipboard.`);
    });
  }


}
