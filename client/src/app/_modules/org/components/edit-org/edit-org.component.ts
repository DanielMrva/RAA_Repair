import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { UpdateOrgFields, Organization } from '@app/graphql/schemas/typeInterfaces';
import { Store } from '@ngrx/store';
import { AppState } from '@app/_store/app.state';
import { editOrg, loadOneOrg } from '@app/_store/_org-store/org.actions';
import { selectOneOrg, orgErrorSelector, orgLoadingSelector } from '@app/_store/_org-store/org.selectors';
import { Subscription } from 'rxjs';

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

  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store<AppState>
  ) {
    this.oneOrg$ = this.store.select(selectOneOrg);
    this.isLoading$ = this.store.select(orgLoadingSelector);
    this.error$ = this.store.select(orgErrorSelector);
  };

  orgForm = new FormGroup({
    orgName: new FormControl<string>('', { nonNullable: true })
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
        }
      })
    );
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
  }

  onSubmit() {

    const orgName = this.orgForm.value.orgName ?? '';

    const submittedOrg: UpdateOrgFields = {
      orgName: orgName
    }

    this.updateOrg(submittedOrg);

  }

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
