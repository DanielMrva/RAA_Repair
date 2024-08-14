import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { deleteRepair } from '@app/_store/_repair-store/repair.actions';
import { ToastService } from '@app/services/toast/toast.service';
import { DeleteModalService } from '@app/services/modal/delete-modal.service';
import { AppState } from '@app/_store/app.state';

@Component({
  selector: 'app-delete-repair-button',
  templateUrl: './delete-repair-button.component.html',
  styleUrls: ['./delete-repair-button.component.css']
})
export class DeleteRepairButtonComponent {
  @Input() repair: any;

  constructor(
    private store: Store<AppState>,
    private deleteModalService: DeleteModalService,
    private toastService: ToastService
  ) {}

  async openDeleteConfirmation($event: Event) {

    $event.stopPropagation();
    $event.preventDefault();
    
    try {
      const result = await this.deleteModalService.openDialog(this.repair._id);

      if (result?.delete) {
        if (result.copy) {
          this.copyToClipboard(this.repair);
        }
        this.confirmDeleteRepair(this.repair);
      }
    } catch (error) {
      console.log('Deletion cancelled', error);
    }
  }

  confirmDeleteRepair(repair: any): void {
    this.store.dispatch(deleteRepair({ id: repair._id }));
  }

  copyToClipboard(repair: any) {
    const text = JSON.stringify(repair, null, 2);
    navigator.clipboard.writeText(text).then(() => {
      this.toastService.show(`Repair ${repair._id} copied to clipboard.`);
    });
  }

}

