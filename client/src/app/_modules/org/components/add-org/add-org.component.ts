import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, ValidatorFn, FormArray } from '@angular/forms';
import { Organization, Tag } from '@app/graphql/schemas';
import { Store } from '@ngrx/store';
import { AppState } from '@app/_store/app.state';
import { addOrg, loadOrgNames } from '@app/_store/_org-store/org.actions';
import { selectOrgNames, orgErrorSelector, orgNamesLoadingSelector } from '@app/_store/_org-store/org.selectors';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-org',
  templateUrl: './add-org.component.html',
  styleUrls: ['./add-org.component.css']
})
export class AddOrgComponent implements OnInit, OnDestroy {

  private subscriptions = new Subscription();

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  orgNames$
  isLoadingOrgNames$
  orgError$

  constructor(
    private store: Store<AppState>
  ) {
    this.orgNames$ = this.store.select(selectOrgNames);
    this.isLoadingOrgNames$ = this.store.select(orgNamesLoadingSelector);
    this.orgError$ = this.store.select(orgErrorSelector);
  }


  orgList!: Organization[];

  orgForm = new FormGroup({
    orgName: new FormControl<string>('', { nonNullable: true, validators: this.orgNameValidator().bind(this) }),
    tags: new FormControl<string[]>([])
  })

  isSubmitted = false;



  ngOnInit(): void {
    this.loadOrgNames();
  };

  fieldValidCheck(field: string) {
    if (
      this.orgForm.get(`${field}`)?.invalid &&
      this.orgForm.get(`${field}`)?.dirty ||
      this.orgForm.get(`${field}`)?.touched ||
      this.isSubmitted) {
      return true
    } else {
      return false
    }
  };

  loadOrgNames(): void {
    this.store.dispatch(loadOrgNames());

    this.subscriptions.add(
      this.orgNames$.subscribe((orgL: Organization[] | null) => {
        if (orgL) {
          this.orgList = orgL
        } else {
          this.orgList = [];
        }
      })
    );



  };

  orgNameValidator(): ValidatorFn {
    return (control) => {
      const input = control.value;
      if (this.orgList && this.orgList.some((org) => org.orgName === input)) {
        return { orgNameExists: true };
      }
      return null;
    }
  };

  onTagsChange(selectedTags: Tag[]): void {
    const tagIds = selectedTags.map(tag => tag._id);
    this.orgForm.patchValue({ tags: tagIds})
   
  };


  onSubmit() {

    console.log(this.orgForm.value);

    const orgName = this.orgForm.value.orgName ?? '';
    const tags = Array.isArray(this.orgForm.value.tags) ? this.orgForm.value.tags.map(tag => tag ?? '') : [''];

    this.store.dispatch(addOrg({ orgName: orgName, tags: tags }));

  };

}
