import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { addTag, editTag, addTagSuccess } from '@app/_store/_tag-store/tag.actions';
import { Actions, ofType } from '@ngrx/effects';
import { first } from 'rxjs/operators';
import { AppState } from '@app/_store/app.state';
import { Tag, AddTagFields } from '@app/graphql/schemas';
import { selectAllTags } from '@app/_store/_tag-store/tag.selectors';

@Component({
  selector: 'app-mutate-tag-form',
  templateUrl: './mutate-tag-form.component.html',
  styleUrls: ['./mutate-tag-form.component.css']
})
export class MutateTagFormComponent implements OnInit{

  @Input() tagID?: string;
  @Input() vertical: boolean = true;
  @Output() formSubmitted = new EventEmitter<Tag>();
  @Output() formCancelled = new EventEmitter<void>();

  tagList: Tag[] = [];

  tagForm = new FormGroup({
    tagName: new FormControl<string>('', Validators.required)
  });

  verticlaClasses = ["col-12"];
  horizontalClasses = ["col-4"];

  constructor(
    private store: Store<AppState>,
    private actions$: Actions
  ) {}

  ngOnInit(): void {

    this.store.select(selectAllTags)
      .pipe(first())
      .subscribe(tags => {
        this.tagList = tags
      });

      if (this.tagID) {
        this.setEditMode(this.tagID);
      }
  };

  private setEditMode(tagID: string): void {
    const tagToEdit = this.tagList.find(tag => tag._id === tagID);

    if (tagToEdit) {
      this.tagForm.patchValue({
        tagName: tagToEdit.tagName
      })
    }
  };

  isDuplicateTag(tagName: string): boolean {
    return this.tagList.some(
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
        this.formSubmitted.emit();
      } else {
        this.store.dispatch(addTag({ tagName: tagFields.tagName}));

        this.actions$.pipe(
          ofType(addTagSuccess),
          first()
        ).subscribe(({ tag }) => {
          this.tagForm.controls.tagName.reset();
          this.formSubmitted.emit(tag)
        })

      }
    }
  };

  cancel(): void {
    this.tagForm.controls.tagName.reset();
    this.formCancelled.emit();
  }


}
