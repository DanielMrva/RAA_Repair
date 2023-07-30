import { Component, Input } from '@angular/core';


@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent {

  @Input() data: any[] = [];


  @Input() disColumns: string[] = []

  displayedColumns = this.disColumns;
  dataSource = this.data;


}
