import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { UpdateOrgFields, Organization, Tag } from '@app/graphql/schemas/typeInterfaces';
import { Store } from '@ngrx/store';
import { AppState } from '@app/_store/app.state';
import { editOrg, loadOneOrg } from '@app/_store/_org-store/org.actions';
import { selectOneOrg, orgErrorSelector, orgLoadingSelector } from '@app/_store/_org-store/org.selectors';
import { Subscription } from 'rxjs';
import { ACCESS_LEVEL_ADMIN } from '@app/utils/constants';

@Component({
  selector: 'app-edit-org',
  templateUrl: './edit-org.component.html',
  styleUrls: ['./edit-org.component.css']
})
export class EditOrgComponent implements OnInit, OnDestroy {

  private subscriptions = new Subscription();


  oneOrg$
  isLoading$
  error$

  startingTags: Tag[] = [];

  ADMIN_ACCESS = ACCESS_LEVEL_ADMIN;

  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store<AppState>
  ) {
    this.oneOrg$ = this.store.select(selectOneOrg);
    this.isLoading$ = this.store.select(orgLoadingSelector);
    this.error$ = this.store.select(orgErrorSelector);
  };

  orgForm = new FormGroup({
    orgName: new FormControl<string>('', { nonNullable: true }),
    tags: new FormControl<string[]>([])
  });
  

  orgId!: string;


  loadOrg(id: string): void {

    this.store.dispatch(loadOneOrg({ orgId: id }))
  };

  populateForm() {

    this.subscriptions.add(
      this.oneOrg$.subscribe((org: Organization | null) => {
        if (org) {
          this.orgForm.patchValue({
            orgName: org.orgName
          })
          this.startingTags = org.tags;
        }
      })
    );
  };

  onTagsChange(selectedTags: Tag[]): void {
    const tagIds = selectedTags.map(tag => tag._id);
    this.orgForm.patchValue({ tags: tagIds})
  };

  updateOrg(updateOrg: UpdateOrgFields): void {

    this.subscriptions.add(
      this.oneOrg$.subscribe((org: Organization | null) => {
        if (org) {
          this.orgId = org._id
        }
      })
    );


    this.store.dispatch(editOrg({ id: this.orgId, updates: updateOrg }))
  };

  onSubmit() {

    const orgName = this.orgForm.value.orgName ?? '';
    const tags = Array.isArray(this.orgForm.value.tags) ? this.orgForm.value.tags.map(tag => tag ?? '') : [''];

    const submittedOrg: UpdateOrgFields = {
      orgName: orgName,
      tags: tags
    }

    this.updateOrg(submittedOrg);

  };

  ngOnInit(): void {

    this.subscriptions.add(
      this.activatedRoute.params.subscribe((params: Params) => {
        const orgId = params['id'];
        this.loadOrg(orgId);
      })
    );
    this.populateForm();
  };


  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  };
}
