import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Tag } from '@app/graphql/schemas';

@Component({
  selector: 'app-mutate-tag-modal',
  templateUrl: './mutate-tag-modal.component.html',
  styleUrls: ['./mutate-tag-modal.component.css']
})
export class MutateTagModalComponent {

  @Input() tagID?: string;

  constructor(public activeModal: NgbActiveModal) {}

  onFormSubmitted(tag: Tag) {
    this.activeModal.close(tag);
  }

}
