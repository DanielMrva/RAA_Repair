import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-org-radios-navigator',
  templateUrl: './org-radios-navigator.component.html',
  styleUrls: ['./org-radios-navigator.component.css']
})
export class OrgRadiosNavigatorComponent implements OnInit {

  orgForm = new FormGroup({
    orgName: new FormControl<string>('', { nonNullable: true })
  });

  constructor(
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  navigateToOrgRadio() {
    const orgName = this.orgForm.get('orgName')?.value || 'raa';
    this.router.navigate(['/org-radio', orgName]);
  }

  ngOnInit(): void {

      
  }
}
