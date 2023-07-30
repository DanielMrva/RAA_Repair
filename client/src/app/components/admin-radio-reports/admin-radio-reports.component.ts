import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RadioService } from '@app/services/radios/radio.service';
import { Radio } from '@app/graphql/schemas/typeInterfaces';
import { TableSearchParams } from '@app/graphql/schemas/typeInterfaces';

@Component({
  selector: 'app-admin-radio-reports',
  templateUrl: './admin-radio-reports.component.html',
  styleUrls: ['./admin-radio-reports.component.css'],
})
export class AdminRadioReportsComponent implements OnInit {

  queryParams: TableSearchParams = {
    queryType: '',
    queryParams: '',
  }

  queryResults: Radio[] | undefined

  constructor(
    private route: ActivatedRoute,
    private radioService: RadioService
  ) {}


  ngOnInit(): void {
      this.route.params.subscribe((params) => {
        this.queryParams.queryType = 'orgRadios'
        this.queryParams.queryParams = params['orgName'];
      });
  }

  loadOrgRadios(orgName: string): void {
    this.radioService.orgRadios(orgName)
    .subscribe(( { data } ) => {
      console.log(data)
      this.queryResults = data.orgRadios;
    });
  }

}
