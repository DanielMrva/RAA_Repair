import { Component, Input} from '@angular/core';
import { AddPartModalService } from '@app/services/modal/add-part-modal.service';
import { loadAllParts } from '@app/_store/_part-store/part.actions';
import { Store } from '@ngrx/store';
import { AppState } from '@app/_store/app.state';
import { ToastService } from '@app/services/toast/toast.service';
import { MutateTagModalService } from '@app/services/modal/mutate-tag-modal.service';
import { loadAllTags } from '@app/_store/_tag-store/tag.actions';

@Component({
  selector: 'app-edit-document-button',
  templateUrl: './edit-document-button.component.html',
  styleUrls: ['./edit-document-button.component.css']
})
export class EditDocumentButtonComponent {

  @Input() docID!: string;
  @Input() docType!: string;

  constructor(
    private addPartModalService: AddPartModalService,
    private mutateTagModalService: MutateTagModalService,
    private toastService: ToastService,
    private store: Store<AppState>
  ) {}

  async openDocEditModal($event: Event, ): Promise <void>{
    $event.stopPropagation();
    $event.preventDefault();

    switch (this.docType) {
      case 'part':
        await this.openPartEditModal();
        this.store.dispatch(loadAllParts());
        break;
      case 'tag':
        await this.openTagEditModal();
        this.store.dispatch(loadAllTags());
        break;
      default:
        this.toastService.show(`Unsuported DocType: ${this.docType}`, {
          classname: 'bg-danger light-text',
          delay: 3000
        })
    };


  }

  private async openPartEditModal(): Promise<void> {
    try {
      const result = await this.addPartModalService.openDialog(this.docID);
      if (result) {
        console.log(`Part Updated: ${result}`);
      }
    } catch (error) {
      console.error(`Error opening part edit modal ${error}`);
    }
  };

  private async openTagEditModal(): Promise<void> {
    try {
      const result = await this.mutateTagModalService.openDialog(this.docID);
      if (result) {
        console.log(`Tag Updated: ${result}`);
      }
    } catch (error) {
      console.error(`Error opening tag edit modal ${error}`);
    }
  };


}

/**
 * 
 * Steps for Future Expansion
 * 
 * Generic Modal Service:
 *  Create a single modal service capable of handling multiple document types.
 *  Dynamically determine which component to load based on docType.
 * 
 * Dynamic Dispatch:
 *  Add more cases in switch for handling different docType values.
 * 
 * Feedback to Parent:
 *  Emit events when editing is complete, e.g., @Output() documentEdited = new EventEmitter<string>();
 * 
 * Store Updates:
 *  Add store dispatch actions for other document types to refersh data after editing.

 */
