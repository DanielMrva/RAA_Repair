import { Injectable } from '@angular/core';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;
import { Repair, Radio, Location } from '@app/graphql/schemas/typeInterfaces';
import { TECH_ADDRESS, RAA_ADDRESS } from '@app/utils/constants';

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

  private edgeAndHeaderBorders = {
    // Draw horizontal lines
    hLineWidth: function (i: number, node: any) {
      if (i === 0 || i === 1 || i === node.table.body.length) {
        return 1; // First line (top border of the table), second line (under the header), and last line (bottom border of the table)
      }
      return 0; // No other horizontal lines
    },
    // Draw vertical lines
    vLineWidth: function (i: number, node: any) {
      if (i === 0 || i === node.table.widths.length) {
        return 1; // First and last vertical lines (left and right borders of the table)
      }
      return 0; // No other vertical lines internally, except...
    },
    // Draw lines between header cells
    hLineColor: function (i: number, node: any) {
      return 'black'; // Color for horizontal lines
    },
    vLineColor: function (i: number, node: any) {
      return 'black'; // Color for vertical lines
    },

  }

  private minHeightTable = {
    myCustomLayout: {
      // Other layout properties...
      paddingBottom: function() { return 30; }, // Adjust padding as needed
    }
  }

  formatRepairForPdf(repair: Repair, radio?: Radio, location?: Location): any {


    const fdatePurchased = radio?.datePurchased ? new Date(parseInt(radio.datePurchased)).toLocaleDateString() : ` `;
    const fDateRec = repair.dateReceived ? new Date(parseInt(repair.dateReceived)).toLocaleDateString() : ` `;
    const fDateSentTech = repair.dateSentTech ? new Date(parseInt(repair.dateSentTech)).toLocaleDateString() : ` `;
    const fDateRecTech = repair.dateRecTech ? new Date(parseInt(repair.dateRecTech)).toLocaleDateString() : ` `;
    const fDateSentEU = repair.dateSentEU ? new Date(parseInt(repair.dateSentEU)).toLocaleDateString() : ` `;

    const warrantyDate = radio?.warranty ? new Date(parseInt(radio?.warranty)).getTime() : new Date(0).getTime();
    const currentDate = Date.now();

    // TODO: Some Grace Period logic, in case we want that in the future.
    // const gracePeriod = 24 * 60 * 60 * 1000;
    // const underWarrantyWithGrace = (warrantyDate + gracePeriod ) > currentDate ? "Yes" : "No"

    const underWarranty = warrantyDate > currentDate ? "Yes" : "No";

    let accessoriesArray = repair.accessories
    let concatAccArr = ''

    if (accessoriesArray && accessoriesArray.length > 0) {
      concatAccArr = accessoriesArray.join(', ');
    }

    const content = [

      {
        stack: [

          {
            columns: [
              {
                width: '70%',
                minHeight: 505,
                stack: [
                  {
                    // Sub-header: Timeline
                    text: 'Timeline:',
                    style: 'subheader',
                    margin: [0, 5, 0, 5]
                  },
                  {
                    table: {
                      widths: ['*', '*'],
                      body: [
                        [`Date Purchased:`, `${fdatePurchased}`],
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
                    margin: [0, 5, 0, 5]
                  },
                  {
                    table: {
                      widths: ['*', '*'],
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
                    margin: [0, 5, 0, 5]
                  },
                  {
                    table: {
                      widths: ['*', '*'],
                      body: [
                        [`RAA Invoice Number:`, `${repair.raaInvNum}`],
                        [`Tech Invoice Number:`, `${repair.techInvNum}`],
                      ]
                    }
                  },
                  {
                    // Sub-Header: Radio Details
                    text: 'Radio Details:',
                    style: 'subheader',
                    margin: [0, 5, 0, 5]
                  },
                  {
                    table: {
                      widths: [`*`, `*`],
                      body: [
                        [`Radio Manufacturer:`, `${radio?.make}`],
                        [`Model`, `${radio?.model}`],
                        [`Serial Number:`, `${radio?.serialNumber}`],
                        [`Under Warranty:`, `${underWarranty}`]
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
                  {
                    table: {
                      body: [
                        [TECH_ADDRESS.locationName],
                        [TECH_ADDRESS.streetAddress],
                        [TECH_ADDRESS.addressSuite],
                        [`${TECH_ADDRESS.city}, ${TECH_ADDRESS.state}, ${TECH_ADDRESS.zip}`],
                        [TECH_ADDRESS.phone],
                        [TECH_ADDRESS.email]
                      ],
                      widths: [`*`]

                    },
                    layout: this.edgeBordersLayout,
                  },
                  {
                    // Sub-header "Customer" before the second table
                    text: 'Customer:',
                    style: 'subheader',
                    margin: [0, 5, 0, 5]
                  },
                  {
                    table: {
                      body: [
                        [RAA_ADDRESS.locationName],
                        [RAA_ADDRESS.streetAddress],
                        [RAA_ADDRESS.addressSuite],
                        [`${RAA_ADDRESS.city}, ${RAA_ADDRESS.state}, ${RAA_ADDRESS.zip}`],
                        [RAA_ADDRESS.phone],
                        [RAA_ADDRESS.email]
                      ],
                      widths: [`*`]

                    },
                    layout: this.edgeBordersLayout,
                  },
                  {
                    // Sub-header "End User" before the third table
                    text: 'End User:',
                    style: 'subheader',
                    margin: [0, 5, 0, 5] // Top and bottom margin
                  },
                  {
                    table: {
                      body: [
                        [`${location?.locationName}`],
                        [`${location?.street}`],
                        [`${location?.suite}`],
                        [`${location?.city}, ${location?.state} ${location?.zip}`],
                        [`${location?.phone}`],
                        [`${location?.contactEmail}`]
                      ],
                      widths: [`*`]

                    },
                    layout: this.edgeBordersLayout,
                  }
                ]
              }
            ],
            minHeight: 505,
            margin: [0, 0, 0, 10]
          },
          {
            table: {
              body: [
                [
                  {
                    table: {
                      body: [
                        [
                          {
                            // Sub-header "Symptoms"
                            text: 'Symptoms:',
                            style: 'subheader',
                            margin: [0, 5, 0, 5] // Top and bottom margin
                          },
                          {
                            ul: [
                              ...repair.symptoms.map(symptom => ({ text: symptom || '____________ \n____________ \n____________' }))

                            ]
                          },

                        ]
                      ],
                      widths: [`*`, `*`],
                    },
                    layout: 'noBorders',
                  },
                  {
                    table: {

                      body: [
                        [
                          {
                            // Sub-header "Accessories"
                            text: 'Accessories:',
                            style: 'subheader',
                            margin: [0, 5, 0, 5] // Top and bottom margin
                          },
                          {
                            ul: [
                              ...repair.accessories.map(accessory => ({ text: accessory || '____________ \n____________ \n____________' }))

                            ]
                          },
                        ]
                      ],
                      widths: [`*`, `*`],
                    },
                    layout: 'noBorders',
                  }
                ],


              ],
              widths: [`*`, `*`]

            }
          },
          {
            table: {
              body: [
                [`Attribute`, `In`, `Out`, `Unit`, `Test Freq`],
                [`RX Sensitivity`, `${repair.incRxSens}`, `${repair.outRxSens}`, `uV`, `${repair.testFreq}`],
                [`Freq Err`, `${repair.incFreqErr}`, `${repair.outFreqErr}`, `Hz`, `${repair.testFreq}`],
                [`Modulation`, `${repair.incMod}`, `${repair.outMod}`, `KHz`, `${repair.testFreq}`],
                [`Power Output`, `${repair.incPowerOut}`, `${repair.outPowerOut}`, `Watts`, `${repair.testFreq}`]
              ],
              widths: [`*`, `*`, `*`, `*`, `*`]
            },
            margin: [0, 5, 0, 5]
          },
          {
            table: {
              // Your table data
              headerRows: 1,
              body: [
                // Header row
                [`Parts Used`, `| Repair Hours: ${repair.repHours}`],
                // Data rows
                [
                  {
                    ul: [
                      ...repair.partsUsed.map(part => ({ text: part || '________________________________________________________ \n________________________________________________________ \n________________________________________________________' }))

                    ]
                  },
                  ''
                ],

              ],
              widths: [`80%`, `20%`]
            },
            layout: this.edgeAndHeaderBorders
          },
          {
            table: {
              body: [
                ['Remarks'],
                [`${repair.remarks || `\n \n`}`]
              ],
              widths: [`*`]
            },
            layout: this.minHeightTable,
            margin: [0, 5, 0, 5]

          },
          {
            table: {
              body: [
                [`PO Text:`, `Sales Order Text:`],
                [`Radio Repair: ${radio?.make} ${radio?.model} Serial NO: ${radio?.serialNumber} with ${concatAccArr}. Repair Tag: ${repair.repairTag}`, `Service Labor to Repair: ${radio?.make} ${radio?.model} Serial NO: ${radio?.serialNumber}. Repair Tag # ${repair.repairTag}`]
              ]
            }
          },
          {
            table: {
              body: [
                [`Technician _______________`, `License # _______________`, `Date _______________`]
              ],
              widths: [`*`,`*`,`*`],

            },
            margin: [0, 5, 0, 5],
            layout: `noBorders`

          }

        ],
      }
    ];

    return {
      content,
      styles: {
        header: {
          fontSize: 14,
          bold: true,
          lineHeight: 1.75
        },
        subHeader: {
          fontSize: 10,
          bold: true,
          lineHeight: 1.5
        },
        bodyTable: {
          fontSize: 9,
          margin: [0, 0, 0, 20]
        }

      },
      defaultStyle: {
        fonstSize: 9,
        columnGap: 15,
        lineHeight: 1
      },
      layout: {
        edgeBordersLayout: this.edgeBordersLayout,
        edgeAndHeaderBorders: this.edgeAndHeaderBorders,
        minHeightTable: this.minHeightTable
      }
    }
  };

  repairPDFGen(repairDef: any): void {

    pdfMake.createPdf(repairDef).open()
  }

  constructor() { }
}
