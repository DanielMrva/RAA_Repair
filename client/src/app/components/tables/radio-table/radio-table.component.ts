import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { RadioDataSource } from '@app/services/radios/radio.dataSource';
import { RadioService } from '@app/services/radios/radio.service';
import { TableSearchParams } from '@app/graphql/schemas';



@Component({
  selector: 'app-radio-table',
  templateUrl: './radio-table.component.html',
  styleUrls: ['./radio-table.component.css']
})
export class RadioTableComponent implements OnInit, OnChanges{



  @Input() searchParams: TableSearchParams = {
    queryType: '',
    queryParams: ''
  }

  // TODO: Later this will have to be some sort of serchable table; so it will want some sort of Params property, with a switch on ngOnInit to run through possible params types to determine which query to run, and what that param is (obviously defaulting to allRadios)

  displayedColumns: string[] = [
    'locationName', 
    'datePurchased', 
    'dateEntered', 
    'inventoryNumber', 
    'make', 
    'model', 
    'progChannels', 
    'notes', 
    'serialNumber', 
    'serviceRecord',
    'warranty', 
    'refurb', 
    'radioType'
  ];

  dataSource = new RadioDataSource(this.radioService);

  constructor(private radioService: RadioService) {
    console.log(`RT constructor`)
  }

  private loadData() {

    this.dataSource = new RadioDataSource(this.radioService);


    console.log('r-t loadData')
    switch (this.searchParams.queryType) {
      case 'orgRadios':
        this.dataSource.loadOrgRadios(this.searchParams.queryParams);
        break;
      default:
        this.dataSource.loadAllRadios();
    }
  }

  ngOnInit(): void {

    console.log('radio table init')

    this.dataSource = new RadioDataSource(this.radioService);

    switch (this.searchParams.queryType) {
      case 'orgRadios': {
        console.log(`r-t switch: ${this.searchParams.queryParams}`)
        this.dataSource.loadOrgRadios(this.searchParams.queryParams);
      }
        break;
      default: this.dataSource.loadAllRadios();
    }

  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('ngOnChanges called')
    // Check if the 'searchParams' input property has changed
    if (changes['searchParams'] && !changes['searchParams'].firstChange) {
      // Handle the changes here
      this.loadData();
    }
  }
  

}
