import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '@app/_store/app.state';
import { loadLikeOrgRadios } from '@app/_store/_radio-store/radio.actions';

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
  ) { }

  navigateToOrgRadio() {
    const orgName = this.orgForm.get('orgName')?.value || 'raa';
    this.router.navigate(['/radio-results', orgName]);
    this.orgForm.patchValue({orgName: ''});
  };
  

  ngOnInit(): void {

      
  };
}
