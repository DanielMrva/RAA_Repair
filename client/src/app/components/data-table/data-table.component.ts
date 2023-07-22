
import { CommonModule } from "@angular/common";
import { Component, ContentChild, Input, NgModule, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css'],

})

export class DataTableComponent {
  @Input() data!: any[];
  @ContentChild('headers') headers: TemplateRef<any> | undefined;
  @ContentChild('rows') rows: TemplateRef<any> | undefined; @Input() filterTerms: string[] =[]
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


// // import { NgTemplateOutlet, NgIf, NgFor } from '@angular/common';
// import { Component, Input } from '@angular/core';

// @Component({
//   selector: 'app-data-table',
//   // standalone: true,
//   templateUrl: './data-table.component.html',
//   styleUrls: ['./data-table.component.css'],
//   // imports: [NgTemplateOutlet, NgFor, NgIf],
//   // template: `
//   //   <table>
//   //   <thead>
//   //     <tr>
//   //       <th *ngFor="let key of filteredDataKeys">{{ key }}</th>
//   //     </tr>
//   //   </thead>
//   //   <tbody>
//   //     <tr *ngFor="let item of data">
//   //       <ng-container *ngFor="let key of filteredDataKeys">
//   //         <td *ngIf="!isTemplateKey(key)">
//   //           {{ item[key] }}
//   //         </td>
//   //         <td *ngIf="isTemplateKey(key)">
//   //           <ng-container *ngIf="templates[key]">
//   //             <ng-container
//   //               *ngTemplateOutlet="templates[key]; context: { $implicit: item[key] }"
//   //             ></ng-container>
//   //           </ng-container>
//   //           <ng-container *ngIf="!templates[key]">
//   //             {{ item[key] }}
//   //           </ng-container>
//   //         </td>
//   //       </ng-container>
//   //     </tr>
//   //   </tbody>
//   // </table>
//   // `
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
