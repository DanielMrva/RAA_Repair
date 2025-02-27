import { Component, EventEmitter, OnInit, Input, Output, OnChanges, SimpleChanges, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef, computed, signal } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable, of, Subject, Subscription } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { distinctUntilChanged, map, shareReplay, startWith, switchMap, takeUntil, tap } from 'rxjs/operators';
import { FilterService } from '@app/services/utilityServices/filter.service';
import { Store } from '@ngrx/store';
import { AppState } from '@app/_store/app.state';
import { selectAllTags } from '@app/_store/_tag-store/tag.selectors';
import { loadAllTags } from '@app/_store/_tag-store/tag.actions';
import { Tag } from '@app/graphql/schemas';
import { MutateTagModalService } from '@app/services/modal/mutate-tag-modal.service';


@Component({
  selector: 'app-tag-selector',
  templateUrl: './tag-selector.component.html',
  styleUrls: ['./tag-selector.component.css']
})
export class TagSelectorComponent implements OnInit, OnChanges {

  @Input() initialTags: Tag[] = [];
  @Output() tagsChange = new EventEmitter<Tag[]>();


  separatorKeyCodes: number[] = [ENTER, COMMA];
  currentTag = signal('');
  selectedTags = signal<Tag[]>([...this.initialTags]);
  allTags = toSignal(this.store.select(selectAllTags), { initialValue: []});
  filteredTags = computed(() => {
    const filterValue = this.currentTag().toLowerCase();
    let matching = this.allTags().filter(tag => tag.tagName.toLowerCase().includes(filterValue));

    if (!filterValue && !this.allTags().some(tag => tag.tagName.toLowerCase() === filterValue)) {
      matching = [{ _id: 'new', tagName: this.currentTag(), isNew: true} as any, ...matching];
    }
    return matching;

  });

  constructor ( 
    private store: Store<AppState>,
    private mutateTagModalService: MutateTagModalService
  ) {}

  ngOnInit(): void {
      this.store.dispatch(loadAllTags());
  };


  ngOnChanges(changes: SimpleChanges): void {
    if (changes['initialTags'] && changes['initialTags'].currentValue) {
      this.selectedTags.set([...changes['initialTags'].currentValue])
    }
  };


  addTag(event: MatChipInputEvent): void {
    const inputValue = (event.value || '').trim();

    if (inputValue) {
      const tag = this.allTags().find(
        t => t.tagName.toLowerCase() === inputValue.toLowerCase()
      );

      if (tag && !this.selectedTags().find(t => t._id === tag._id)) {
        this.selectedTags.update(tags => [ ...tags, tag]);
        this.emitTagsChange();
      }
    }

    this.currentTag.set('');
  };

  selected(event: MatAutocompleteSelectedEvent): void {
    const selectedValue = event.option.value as Tag & { isNew?: boolean};

    if (selectedValue.isNew) {
      // If this is the special, new option, open the modal
      this.mutateTagModalService.openDialog().then((newTag: Tag | null) => {
        if (newTag) {
          this.store.dispatch(loadAllTags());

          this.selectedTags.update(tags => [...tags, newTag]);
          this.emitTagsChange();
        }
      }).catch(error => {
        console.log('Modal was cancelled or dismissed', error);
      })
    } else {
      if (!this.selectedTags().find( t => t._id === selectedValue._id)) {
        this.selectedTags.update(tags => [...tags, selectedValue]);

        this.emitTagsChange();
      }
    }
    this.currentTag.set('');
  };

  removeTag(tagToRemove: Tag): void {
    this.selectedTags.update(tags => tags.filter( tag => tag._id !== tagToRemove._id));
    this.emitTagsChange();
  };

  onInput(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.currentTag.set(inputElement.value ?? '')
  };

  private emitTagsChange(): void {
    this.tagsChange.emit(this.selectedTags());
  }

}