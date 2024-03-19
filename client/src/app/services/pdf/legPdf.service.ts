import { Injectable } from '@angular/core';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;
import { Repair } from '@app/graphql/schemas';

@Injectable({
  providedIn: 'root'
})
export class PdfService {

  formatRepairForPdf(repair: Repair): any {

    const fDateRec = repair.dateReceived ? new Date(parseInt(repair.dateReceived)).toLocaleDateString() : `__________________`;
    const fDateSentTech = repair.dateSentTech ? new Date(parseInt(repair.dateSentTech)).toLocaleDateString() : `__________________`;
    const fDateRecTech = repair.dateRecTech ? new Date(parseInt(repair.dateRecTech)).toLocaleDateString() : `__________________`;
    const fDateSentEU = repair.dateSentEU ? new Date(parseInt(repair.dateSentEU)).toLocaleDateString() : `__________________`;

    const customLayouts = {
      edgeBordersLayout: {
        layout: {
          // Custom layout for borders
          hLineWidth: function(i: number, node: any): number {
            if (i === 0 || i === node.table.body.length) return 1; // Top and bottom border
            return 0; // No internal horizontal borders
          },
          vLineWidth: function(i: number, node: any): number {
            if (i === 0 || i === node.table.widths.length) return 1; // Left and right border
            return 0; // No internal vertical borders
          },
          hLineColor: function(i: number, node: any): string {
            return 'black'; // Color for horizontal lines
          },
          vLineColor: function(i: number, node: any): string {
            return 'black'; // Color for vertical lines
          },
        },
      }
    }

    const content = [

      {
        columns: [
          {
            // Left column (70% width), left blank
            width: '70%',
            text: ''
          },
          {
            // Right column (30% width)
            width: '30%',
            stack: [
              {
                // Header for the right column
                text: 'Details',
                style: 'header',
                margin: [0, 0, 0, 10] // Bottom margin
              },

              // First table (Foo)
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
                layout: 'noBorders' // No borders around the table
              },
              {
                // Sub-header "Customer" before the second table
                text: 'Customer',
                style: 'subheader',
                margin: [0, 10, 0, 5] // Top and bottom margin
              },
              // Second table (Bar)
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
                layout: 'edgeBordersLayout' // No borders around the table
              },
              {
                // Sub-header "End User" before the third table
                text: 'End User',
                style: 'subheader',
                margin: [0, 10, 0, 5] // Top and bottom margin
              },
              // Third table (Baz)
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
                layout: 'edgeBordersLayout'
              }
            ]
          }
        ]
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
      layout: customLayouts
    }
  };

  repairPDFGen(repairDef: any): void {

    pdfMake.createPdf(repairDef).open()
  }

  constructor() { }
}

      // {
      //   text: `Repair Tag # ${repair.repairTag}`,
      //   style: 'header',
      //   alignment: 'right'
      // },
      // {
      //   text: `Timeline`,
      //   style: 'subHeader',
      //   alignment: 'center'
      // },
      // {
      //   columns: [
      //     {
      //       width: '*',
      //       text: `Date Received: ${fDateRec}`
      //     },
      //     {
      //       width: '*',
      //       text: `Date Sent Tech: ${fDateSentTech}`
      //     },
      //     {
      //       width: '*',
      //       text: `Date Received From Tech: ${fDateRecTech}`
      //     },
      //     {
      //       width: '*',
      //       text: `Date Sent End User: ${fDateSentEU}`
      //     }
      //   ]
      // },
      // {
      //   text: `Inventory / PO Tracking`,
      //   style: 'subHeader',
      //   alignment: 'center'
      // },
      // {
      //   columns: [
      //     {
      //       width: '*',
      //       text: `RAA Invoice: ${repair.raaInvNum || `______________`}`
      //     },
      //     {
      //       width: '*',
      //       text: `RAA PO: ${repair.raaPO || `______________`}`
      //     },
      //     {
      //       width: '*',
      //       text: `End User PO: ${repair.endUserPO || `______________`}`
      //     }
      //   ]
      // },
      // {
      //   columns: [
      //     {
      //       width: '*',
      //       text: `Radio ID: ${repair.radioID || `______________`}`
      //     },
      //     [
      //       'Accessories:',
      //       {
      //         ul: [
      //           ...repair.accessories.map(accessory => ({ text: accessory || `_________________________________ \n _________________________________ \n _________________________________ \n _________________________________ \n _________________________________ \n _________________________________ \n _________________________________ \n _________________________________\n _________________________________` }))
      //         ]
      //       }
      //     ]
      //   ]
      // },
      // {
      //   text: `Symptoms and Diagnostics`,
      //   style: 'subHeader',
      //   alignment: 'center'
      // },
      // {
      //   columns: [
      //     [
      //       'Symptoms:',
      //       {
      //         ul: [
      //           ...repair.symptoms.map(symptom => ({ text: symptom || '_________________________________ \n _________________________________ \n _________________________________ \n _________________________________ \n _________________________________ \n _________________________________ \n _________________________________ \n _________________________________ ' }))

      //         ]
      //       }
      //     ],
      //     [
      //       'Diagnostics:',
      //       `Test Frequency: ${repair.testFreq || '______'}`,
      //       {
      //         style: 'testTable',
      //         table: {
      //           body: [
      //             ['Attribute', 'IN', 'OUT'],
      //             ['RX Sensitivity', `${repair.incRxSens || '_________'}`, `${repair.outRxSens || '_________'}`],
      //             ['Freq Err', `${repair.incFreqErr || '_________'}`, `${repair.outFreqErr || '_________'}`],
      //             ['Modulation', `${repair.incMod || '_________'}`, `${repair.outMod || '_________'}`],
      //             ['Power Output', `${repair.incPowerOut || '_________'}`, `${repair.outPowerOut || '_________'}`]
      //           ]
      //         }
      //       }
      //     ]
      //   ]
      // },
      // {
      //   text: `Work Details`,
      //   style: 'subHeader',
      //   alignment: 'center'
      // },
      // {
      //   columns: [
      //     [
      //       `Tech Invoice Number: ${repair.techInvNum || `__________________`}`,
      //       'Work Performed:',
      //       {
      //         ul: [
      //           ...repair.workPerformed.map(work => ({ text: work || '_______________________________ \n _______________________________ \n _______________________________ \n _______________________________ \n _______________________________ \n _______________________________ \n _______________________________ \n _______________________________ \n' }))

      //         ]
      //       }
      //     ],
      //     [
      //       `Repair Hours: ${repair.repHours || `__________________`}`,
      //       'Parts Used:',
      //       {
      //         ul: [
      //           ...repair.partsUsed.map(part => ({ text: part || '_______________________________ \n _______________________________ \n _______________________________ \n _______________________________ \n _______________________________ \n _______________________________ \n _______________________________ \n _______________________________ \n ' }))

      //         ]
      //       }
      //     ]
      //   ]
      // },
      // {
      //   text: `Remarks`,
      //   style: 'subHeader',
      //   alignment: 'center'
      // },
      // `${repair.remarks || '_______________________________________________________________________________________ \n _______________________________________________________________________________________ \n _______________________________________________________________________________________ \n _______________________________________________________________________________________ \n _______________________________________________________________________________________ \n '}`

