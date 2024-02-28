import { Injectable } from '@angular/core';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;
import { Repair, Radio } from '@app/graphql/schemas';

@Injectable({
  providedIn: 'root'
})
export class PdfService {

  private edgeBordersLayout = {
    // Custom layout for borders defined at the class level
    hLineWidth: function (i: number, node: any): number {
      if (i === 0 || i === node.table.body.length) return 1; // Top and bottom border
      return 0; // No internal horizontal borders
    },
    vLineWidth: function (i: number, node: any): number {
      if (i === 0 || i === node.table.widths.length) return 1; // Left and right border
      return 0; // No internal vertical borders
    },
    hLineColor: function (i: number, node: any): string {
      return 'black'; // Color for horizontal lines
    },
    vLineColor: function (i: number, node: any): string {
      return 'black'; // Color for vertical lines
    }
  };

  formatRepairForPdf(repair: Repair, radio?: Radio): any {

    const fDateRec = repair.dateReceived ? new Date(parseInt(repair.dateReceived)).toLocaleDateString() : `__________________`;
    const fDateSentTech = repair.dateSentTech ? new Date(parseInt(repair.dateSentTech)).toLocaleDateString() : `__________________`;
    const fDateRecTech = repair.dateRecTech ? new Date(parseInt(repair.dateRecTech)).toLocaleDateString() : `__________________`;
    const fDateSentEU = repair.dateSentEU ? new Date(parseInt(repair.dateSentEU)).toLocaleDateString() : `__________________`;

    const content = [

      {
        stack: [

          {
            columns: [
              {
                // Left column (70% width), left blank
                width: '70%',
                minHeight: 505,
                stack: [
                  {
                    // Sub-header: Timeline
                    text: 'Timeline:',
                    style: 'subheader',
                    margin: [0, 10, 0, 5]
                  },
                  {
                    table: {
                      width: ['*', '*'],
                      body: [
                        [`Date Sold:`, `TODO: EDIT THIS`],
                        [`Date Received:`, `${fDateRec}`],
                        [`Date Sent to Tech:`, `${fDateSentTech}`],
                        [`Date Received from Tech:`, `${fDateRecTech}`],
                        [`Date Sent to End User:`, `${fDateSentEU}`],
                      ]
                    }
                  },
                  {
                    // Sub-header: PO/Tracking
                    text: 'PO Tracking:',
                    style: 'subheader',
                    margin: [0, 10, 0, 5]
                  },
                  {
                    table: {
                      width: ['*', '*'],
                      body: [
                        [`End User PO:`, `${repair.endUserPO}`],
                        [`Customer PO:`, `${repair.raaPO}`],
                        [`Control ID:`, `${repair.repairTag}`],
                      ]
                    }
                  },
                  {
                    // Sub-header: Invoicing
                    text: 'Invoicing:',
                    style: 'subheader',
                    margin: [0, 10, 0, 5]
                  },
                  {
                    table: {
                      width: ['*', '*'],
                      body: [
                        [`RAA Invoice Number:`, `${repair.raaInvNum}`],
                        [`Tech Invoice Number:`, `${repair.techInvNum}`],
                      ]
                    }
                  }
                ]
              },
              {
                // Right column (30% width)
                width: '30%',
                minHeight: 505,
                stack: [
                  {
                    // Header for the right column
                    text: `Repair Tag # ${repair.repairTag}`,
                    style: 'header',
                    margin: [0, 0, 0, 10] // Bottom margin
                  },

                  // First table (Foo) TODO: Change to MRS
                  {
                    table: {
                      body: [
                        ['Foo'],
                        ['123 Foo St'],
                        ['Foo City, FS 12345'],
                        ['123-456-7890'],
                        ['foo@example.com']
                      ]
                    },
                    layout: this.edgeBordersLayout
                  },
                  {
                    // Sub-header "Customer" before the second table
                    text: 'Customer:',
                    style: 'subheader',
                    margin: [0, 10, 0, 5]
                  },
                  // Second table (Bar) TODO: Change to RAA
                  {
                    table: {
                      body: [
                        ['Bar'],
                        ['456 Bar Lane'],
                        ['Bar Town, BT 67890'],
                        ['234-567-8901'],
                        ['bar@example.net']
                      ]
                    },
                    layout: this.edgeBordersLayout
                  },
                  {
                    // Sub-header "End User" before the third table
                    text: 'End User:',
                    style: 'subheader',
                    margin: [0, 10, 0, 5] // Top and bottom margin
                  },
                  // Third table (Baz) TODO: Confirm with client that end user should be a Location as currently described in DB structure.
                  {
                    table: {
                      body: [
                        ['Baz'],
                        ['789 Baz Blvd'],
                        ['Baz City, BC 34567'],
                        ['345-678-9012'],
                        ['baz@example.org']
                      ]
                    },
                    layout: this.edgeBordersLayout
                  }
                ]
              }
            ],
            minHeight: 505
          },
          {
            minHeight: 337,
            text: 'content for the bottom 40% goes here',
            
          }
        ],
      }
    ];

    return {
      content,
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          lineHeight: 1.75
        },
        subHeader: {
          fontSize: 14,
          bold: true,
          lineHeight: 1.5
        },
        bodyTable: {
          margin: [0, 0, 0, 20]
        }

      },
      defaultStyle: {
        columnGap: 15,
        lineHeight: 1
      },
      layout: {
        edgeBordersLayout: this.edgeBordersLayout
      }
    }
  };

  repairPDFGen(repairDef: any): void {

    pdfMake.createPdf(repairDef).open()
  }

  constructor() { }
}
