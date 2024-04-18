import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, ValidatorFn } from '@angular/forms';
import { Organization } from '@app/graphql/schemas';
import { Store } from '@ngrx/store';
import { AppState } from '@app/_store/app.state';
import { addOrg, loadOrgNames } from '@app/_store/_org-store/org.actions';
import { selectOrgNames, orgLoadingSelector, orgErrorSelector  } from '@app/_store/_org-store/org.selectors';

@Component({
  selector: 'app-add-org',
  templateUrl: './add-org.component.html',
  styleUrls: ['./add-org.component.css']
})
export class AddOrgComponent implements OnInit {

  orgNames$
  isLoadingOrgNames$
  orgError$

  constructor( 
    private store: Store<AppState>
  ){ 
    this.orgNames$ = this.store.select(selectOrgNames);
    this.isLoadingOrgNames$ = this.store.select(orgLoadingSelector);
    this.orgError$ = this.store.select(orgErrorSelector);
  }


  orgList!: Organization[];

  orgForm = new FormGroup({
    orgName: new FormControl<string>('', {nonNullable: true, validators: this.orgNameValidator().bind(this) })
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

    this.orgNames$.subscribe(( orgL: Organization[] | null) => {
      if(orgL) {
        this.orgList = orgL
      } else {
        this.orgList = [];
      }
    })
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

  onSubmit() {

    console.log(this.orgForm.value);

    const orgName = this.orgForm.value.orgName ?? '';

    this.store.dispatch(addOrg({orgName: orgName}));

  };

}
