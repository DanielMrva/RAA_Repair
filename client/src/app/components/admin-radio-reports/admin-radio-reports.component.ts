import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { ORG_RADIOS } from '@app/graphql/schemas';
import { Radio } from '@app/graphql/schemas/typeInterfaces';


@Component({
  selector: 'app-admin-radio-reports',
  templateUrl: './admin-radio-reports.component.html',
  styleUrls: ['./admin-radio-reports.component.css']
})
export class AdminRadioReportsComponent implements OnInit {

  queryResults: Radio[] | undefined

  constructor(
    private route: ActivatedRoute,
    private apollo: Apollo
  ) {}


  ngOnInit(): void {
      this.route.params.subscribe((params) => {
        const orgName = params['orgName'];
        this.loadOrgRadios('orgName')
      });
  }

  loadOrgRadios(orgName: string): void {
    this.apollo.query<{ orgRadios: Radio[] }>({
      query: ORG_RADIOS,
      variables: {
        orgName
      }
    })
    .subscribe(( { data } ) => {
      console.log(data)
      this.queryResults = data.orgRadios;
    });
  }

}
