import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-org-rad-navigator',
  templateUrl: './org-rad-navigator.component.html',
  styleUrls: ['./org-rad-navigator.component.css']
})
export class OrgRadNavigatorComponent {

  
  orgForm = new FormGroup({
    orgName: new FormControl<string>('', { nonNullable: true })
  });

  constructor(
    private router: Router,
  ) { }

  navigateToOrgRadio() {
    const orgName = this.orgForm.get('orgName')?.value || 'raa';
    this.router.navigate(['/radio-results', orgName]);
    this.orgForm.patchValue({orgName: ''});
  };


}
