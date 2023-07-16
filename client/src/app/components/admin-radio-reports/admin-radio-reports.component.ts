import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RadioService } from '@app/services/radio.service';
import { Radio } from '@app/graphql/schemas/typeInterfaces';
import { NotesTemplateComponent } from '@app/components/data-table/data-table-templates/notes-template/notes-template.component';
import { ServiceRecordTemplateComponent } from '@app/components/data-table/data-table-templates/service-record-template/service-record-template.component';


@Component({
  selector: 'app-admin-radio-reports',
  templateUrl: './admin-radio-reports.component.html',
  styleUrls: ['./admin-radio-reports.component.css']
})
export class AdminRadioReportsComponent implements OnInit {

  queryResults: Radio[] | undefined

  headerArray = [
    {'header': "Location", "fieldName": "location", "dataType": "string"},
    {'header': "Date Sold", "fieldName": "dateSold", "dataType": "string"},
    {'header': "Date Entered", "fieldName": "dateEntered", "dataType": "string"},
    {'header': "Inventory #", "fieldName": "inventoryNumber", "dataType": "string"},
    {'header': "Make", "fieldName": "make", "dataType": "string"},
    {'header': "Model", "fieldName": "model", "dataType": "string"},
    {'header': "Channels", "fieldName": "progChannels", "dataType": "string"},
    {'header': "Serial", "fieldName": "serialNumber", "dataType": "string"},
    {'header': "Notes", "fieldName": "notes", "dataType": "array"},
    {'header': "Service Record", "fieldName": "serviceRecord", "dataType": "object"},
    {'header': "Warranty Date", "fieldName": "warranty", "dataType": "string"},
    {'header': "Refurbish", "fieldName": "refurb", "dataType": "string"},
    {'header': "Radio Type", "fieldName": "radioType", "dataType": "string"},

  ]

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
        const orgName = params['orgName'];
        this.loadOrgRadios(orgName)
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
