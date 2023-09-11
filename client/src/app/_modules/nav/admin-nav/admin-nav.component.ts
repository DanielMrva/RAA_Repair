import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-nav',
  templateUrl: './admin-nav.component.html',
  styleUrls: ['./admin-nav.component.css']
})
export class AdminNavComponent {
  orgRadiosForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
  ) {
    this.orgRadiosForm = this.formBuilder.group({
      orgName: ''
    });
  }

  navigateOrgRadios() {
    const orgName = this.orgRadiosForm.value.orgName;
    console.log(`orgName: ${orgName}`);

    if (orgName) {
      console.log(`Navigating to: /org-radio/${orgName}`);
      this.router.navigate(['/org-radio', orgName]);
    } else {
      console.log(`Navigating to: /org-radio/raa`);
      this.router.navigate(['/org-radio', 'raa']);
    }
  }
}
