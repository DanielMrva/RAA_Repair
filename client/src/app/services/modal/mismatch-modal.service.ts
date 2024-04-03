import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { LocationMismatchDialogComponent } from '@app/_components/utilComponents/location-mismatch-dialog/location-mismatch-dialog.component';
// Import any actions or state needed

@Injectable({
  providedIn: 'root'
})
export class MismatchModalService {

  constructor(private modalService: NgbModal, private store: Store) { }

  openMismatchDialog(newLocation: string, oldLocation: string, radioID: string, finalizeSubmissionCallback: () => void): void {
    const modalRef = this.modalService.open(LocationMismatchDialogComponent);
    modalRef.componentInstance.newLocation = newLocation;
    modalRef.componentInstance.oldLocation = oldLocation;
    modalRef.componentInstance.radioID = radioID;

    modalRef.result.then((result) => {
      if (result === 'submit' || result === 'Update confirmed') {
        console.log('MM.finalizeSubmissionCallback()')

        finalizeSubmissionCallback();
      }
      // If result is 'cancel' or dismissed, do nothing or navigate back as needed
    }).catch((reason) => {
      console.log(`Dismissed: ${reason}`);
      // Handle the modal dismissal if needed
    });
  }
}
