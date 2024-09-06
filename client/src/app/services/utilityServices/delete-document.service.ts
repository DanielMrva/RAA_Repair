import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { deleteRepair } from '@app/_store/_repair-store/repair.actions';
import { deleteUser } from '@app/_store/_user-store/user.actions';
import { deleteRadio } from '@app/_store/_radio-store/radio.actions';
import { deleteLocation } from '@app/_store/_location-store/location.actions';
import { deleteOrganization } from '@app/_store/_org-store/org.actions';
import { AppState } from '@app/_store/app.state';


@Injectable({
  providedIn: 'root'
})
export class DeleteDocumentService {

  constructor(private store: Store<AppState>) {}

  deleteDocument(docType: string, id: string): void {
    switch (docType) {
      case 'repair':
        this.store.dispatch(deleteRepair({ id }));
        break;
      case 'user':
        this.store.dispatch(deleteUser({ id }));
        break;
      case 'radio':
        this.store.dispatch(deleteRadio({ id }));
        break;
      case 'location':
        this.store.dispatch(deleteLocation({ id }));
        break;
      case 'organization':
        this.store.dispatch(deleteOrganization({ id }));
        break;
      // Add more cases as needed
      default:
        console.error('Unknown document type');
    }
  }
}
