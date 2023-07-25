import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RadioService } from '@app/services/radios/radio.service';
import { Radio } from '@app/graphql/schemas/typeInterfaces';
import { NotesTemplateComponent } from '@app/components/data-table/data-table-templates/notes-template/notes-template.component';
import { ServiceRecordTemplateComponent } from '@app/components/data-table/data-table-templates/service-record-template/service-record-template.component';
import { RadioSearchParams } from '@app/graphql/schemas/typeInterfaces';

@Component({
  selector: 'app-admin-radio-reports',
  templateUrl: './admin-radio-reports.component.html',
  styleUrls: ['./admin-radio-reports.component.css'],
})
export class AdminRadioReportsComponent implements OnInit {

  orgName: string = ''

  queryParams: RadioSearchParams = {
    queryType: '',
    queryParams: '',
  }

  queryResults: Radio[] | undefined

  customTemplates = {
    notes: NotesTemplateComponent,
    serviceRecord: ServiceRecordTemplateComponent
  }

  constructor(
    private route: ActivatedRoute,
    private radioService: RadioService
  ) {}


  ngOnInit(): void {
      this.route.params.subscribe((params) => {
        this.queryParams.queryType = 'orgRadios'
        this.queryParams.queryParams = params['orgName'];
        // this.loadOrgRadios(orgName)
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
