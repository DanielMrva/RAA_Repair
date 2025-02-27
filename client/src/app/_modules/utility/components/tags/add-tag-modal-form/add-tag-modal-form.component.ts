import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { addTag, editTag, addTagSuccess } from '@app/_store/_tag-store/tag.actions';
import { Actions, ofType } from '@ngrx/effects';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { selectAllTags } from '@app/_store/_tag-store/tag.selectors';
import { first } from 'rxjs/operators';
import { AppState } from '@app/_store/app.state';
import { Tag, AddTagFields } from '@app/graphql/schemas';

@Component({
  selector: 'app-add-tag-modal-form',
  templateUrl: './add-tag-modal-form.component.html',
  styleUrls: ['./add-tag-modal-form.component.css']
})
export class AddTagModalFormComponent implements OnInit{

  @Output() tagAdded = new EventEmitter<Tag>();
  @Output() modalClosed = new EventEmitter<void>();
  @Input() tagID?: string;
  @Input() vertical?: boolean = true;

  tagsList: Tag[] = [];

  tagForm = new FormGroup({
    tagName: new FormControl<string>('', Validators.required)
  });

  verticalClasses = ["col-12"];
  horizontalClasses = ["col-4"]

  constructor(
    private store: Store<AppState>,
    private activeModal: NgbActiveModal,
    private actions$: Actions
  ) {}

  ngOnInit(): void {

    this.store.select(selectAllTags)
      .pipe(first())
      .subscribe(tags => {
        this.tagsList = tags
      });

      if (this.tagID) {
        this.setEditMode(this.tagID)
      }
      
  };

  private setEditMode(tagID: string): void {
    const tagToEdit = this.tagsList.find(tag => tag._id === tagID);

    if (tagToEdit) {
      this.tagForm.patchValue({
        tagName: tagToEdit.tagName
      })
    }
  };

  isDuplicateTag(tagName: string): boolean {
    return this.tagsList.some(
      tag => tag.tagName.toLowerCase() === tagName.toLowerCase()
    )
  };

  submitForm(): void {
    if (this.tagForm.valid) {
      const tagData = this.tagForm.value;

      if (!this.tagID) {
        if (this.isDuplicateTag(tagData.tagName || '')) {
          alert('Tag Name already exists');
          return;
        }
      }

      const tagFields: AddTagFields = {
        tagName: tagData.tagName ?? ''
      };

      if (this.tagID) {
        this.store.dispatch(editTag({ id: this.tagID, updates: tagFields}));
        this.activeModal.close(`Updated ${tagData.tagName}`);
      } else {
        this.store.dispatch(addTag({ tagName: tagFields.tagName}));

        this.actions$.pipe(
          ofType(addTagSuccess),
          first()
        ).subscribe(({ tag }) => {
          this.activeModal.close(tag);
          this.tagAdded.emit(tag);
        })

      }
    }
  };

  closeModal(): void {
    this.modalClosed.emit();
    this.activeModal.close();
  };

  cancel(): void {
    this.activeModal.dismiss();
  }

}
