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
  ) {}


  ngOnInit(): void {

      this.route.paramMap.subscribe((params) => {
        this.queryParams.queryType = 'orgRadios'
        const tempQueryParams = params.get('orgName');

        if (tempQueryParams) {
          this.queryParams.queryParams = tempQueryParams;
        } else {
          this.queryParams.queryParams = 'raa'
        }
      });
  }

}
