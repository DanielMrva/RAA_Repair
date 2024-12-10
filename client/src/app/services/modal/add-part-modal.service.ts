import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddPartModalFormComponent } from '@app/_modules/utility/components/addPartModalForm/add-part-modal-form/add-part-modal-form.component';

@Injectable({
  providedIn: 'root'
})
export class AddPartModalService {

  constructor(private modalService: NgbModal) { }


  openDialog(): Promise<string | null> {
    const modalRef = this.modalService.open(AddPartModalFormComponent, { centered: true, backdrop: 'static' });
  
    return modalRef.result.catch(() => null); // Catch dismiss action and return null
  }
  
  
}
