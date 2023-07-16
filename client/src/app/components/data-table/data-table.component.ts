import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent {

  @Input() data: any[] = [];
  @Input() headerArray: any[] = [];
  @Input() filterTerms: string[] =[]
  @Input() templates: { [key: string]: any } = {}
  filteredDataKeys: string[] = [];


  ngOnChanges() {

    if (this.data && this.data.length > 0) {
      this.filteredDataKeys = this.dataKeys.filter(key =>  !this.filterTerms.includes(key));
    }
  }

  get dataKeys() {
    return Object.keys(this.data[0]);
  }

  isTemplateKey(key: string): boolean {
    return key in this.templates;
  }

  getItemValue(item: any, key: string): any {
    if (this.isTemplateKey(key)) {
      return item[key];
    } else {
      return item;
    }
  }

}

// Old component
// import { Component, Input } from '@angular/core';

// @Component({
//   selector: 'app-data-table',
//   templateUrl: './data-table.component.html',
//   styleUrls: ['./data-table.component.css']
// })
// export class DataTableComponent {

//   @Input() data: any[] = [];
//   @Input() filterTerms: string[] =[]
//   @Input() templates: { [key: string]: any } = {}
//   filteredDataKeys: string[] = [];


//   ngOnChanges() {

//     if (this.data && this.data.length > 0) {
//       this.filteredDataKeys = this.dataKeys.filter(key =>  !this.filterTerms.includes(key));
//     }
//   }

//   get dataKeys() {
//     return Object.keys(this.data[0]);
//   }

//   isTemplateKey(key: string): boolean {
//     return key in this.templates;
//   }

//   getItemValue(item: any, key: string): any {
//     if (this.isTemplateKey(key)) {
//       return item[key];
//     } else {
//       return item;
//     }
//   }

// }
