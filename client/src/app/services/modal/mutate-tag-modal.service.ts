import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddTagModalFormComponent } from '@app/_modules/utility/components/tags/add-tag-modal-form/add-tag-modal-form.component';
import { Tag } from '@app/graphql/schemas/typeInterfaces';
import { MutateTagModalComponent } from '@app/_modules/utility/components/tags/mutate-tag-modal/mutate-tag-modal.component';


@Injectable({
  providedIn: 'root'
})
export class MutateTagModalService {

  constructor(private modalService: NgbModal) { }

  openDialog(docID?: string): Promise<Tag | null> {
    const modalRef = this.modalService.open(MutateTagModalComponent, { centered: true, backdrop: 'static'});

    if (docID) {
      modalRef.componentInstance.tagID = docID;
    }

    return modalRef.result.catch(() => null);
  }
}
