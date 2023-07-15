import { Component, Input } from '@angular/core';

type serviceRecordSnip = {
  _id: string,
  dateReceived: string
}

@Component({
  selector: 'app-service-record-template',
  templateUrl: './service-record-template.component.html',
  styleUrls: ['./service-record-template.component.css']
})
export class ServiceRecordTemplateComponent {

  @Input() serviceRecords: serviceRecordSnip[] = [{_id: '', dateReceived: ''}];
}
