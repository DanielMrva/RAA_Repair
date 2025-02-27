import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { OrgParamTypes } from '@app/graphql/schemas';

@Component({
  selector: 'app-org-search',
  templateUrl: './org-search.component.html',
  styleUrls: ['./org-search.component.css']
})
export class OrgSearchComponent {

  OrgParamTypes = OrgParamTypes;

  orgForm = new FormGroup({
    paramType: new FormControl<OrgParamTypes>(OrgParamTypes.OrgName),
    searchTerm: new FormControl<string>('')
  });

  constructor(
    private router: Router
  ) { }

  get serachPlaceholder(): string {
    const paramType = this.orgForm.get('paramType')?.value;

    if (paramType === OrgParamTypes.OrgName) {
      return 'Enter organization name';
    } else if (paramType === OrgParamTypes.TagNames) {
      return 'Enter tag names, separated by commas';
    }
    return 'Enter search term'
  };

  get paramTypeValue(): string {
    const paramType = this.orgForm.get('paramType')?.value;

    if (paramType) {
      return paramType
    } else {
      return 'Search Term'
    }
  }

  navigateByOrgInput() {
    const paramType = this.orgForm.get('paramType')?.value;

    const searchTerm = this.orgForm.get('searchTerm')?.value?.trim();

    if (paramType && searchTerm ) {
      const queryParams = { [paramType]: searchTerm};
      this.router.navigate(['/org-results'], { queryParams });
    } else {
      this.router.navigate(['/org-results']);
    }

    this.orgForm.patchValue({searchTerm: ''})
  }

}
