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
  };

  private minHeightTable = {
    paddingBottom: function () { return 30; }, // Adjust padding as needed
  };

  formatRepairForPdf(repair: Repair, radio?: Radio, location?: Location): any {

    const fdatePurchased = radio?.datePurchased ? new Date(parseInt(radio.datePurchased)).toLocaleDateString() : ` `;
    const fDateRec = repair.dateRecEuRaa ? new Date(parseInt(repair.dateRecEuRaa)).toLocaleDateString() : ` `;
    const fDateSentTech = repair.dateSentRaaTech ? new Date(parseInt(repair.dateSentRaaTech)).toLocaleDateString() : ` `;
    const fDateRecTech = repair.dateRecTechRaa ? new Date(parseInt(repair.dateRecTechRaa)).toLocaleDateString() : ` `;
    const fDateSentEU = repair.dateSentRaaEu ? new Date(parseInt(repair.dateSentRaaEu)).toLocaleDateString() : ` `;

    const warrantyDate = radio?.warranty ? new Date(parseInt(radio?.warranty)).getTime() : new Date(0).getTime();
    const currentDate = Date.now();
    const underWarranty = warrantyDate > currentDate ? "Yes" : "No";

    const content = [
      {
        stack: [
          {
            // Header for the Repair Tag
            text: `Repair Tag # ${repair.repairTag}`,
            style: 'header',
            margin: [0, 0, 0, 7] // Bottom margin
          },
          {
            // Addresses table
            table: {
              body: [
                [
                  { text: 'Technician:', alignment: 'center', bold: true },
                  { text: 'Customer:', alignment: 'center', bold: true },
                  { text: 'End User:', alignment: 'center', bold: true }
                ],
                [
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
                      widths: ['*']
                    },
                    layout: 'noBorders',
                    margin: [0, 0, 10, 0] // Right margin
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
                      widths: ['*']
                    },
                    layout: 'noBorders',
                    margin: [0, 0, 10, 0] // Right margin
                  },
                  {
                    table: {
                      body: [
                        [`${location?.locationName}`],
                        [`${location?.street}`],
                        [`${location?.suite ? location.suite : ''}`],
                        [`${location?.city}, ${location?.state} ${location?.zip}`],
                        [`${location?.phone}`],
                        [`${location?.contactEmail}`]
                      ],
                      widths: ['*']
                    },
                    layout: 'noBorders'
                  }
                ]
              ],
              widths: ['33%', '33%', '33%'],
              margin: [0, 0, 0, 7] // Bottom margin
            }
          },
          {
            // Sub-header: Radio Details
            text: 'Radio Details:',
            style: 'subheader',
            margin: [0, 3, 0, 3]
          },
          {
            table: {
              widths: ['*', '*', '*', '*'],
              body: [
                [{ text: 'Radio Manufacturer:', bold: true }, `${radio?.make}`, { text: 'Model:', bold: true }, `${radio?.model}`],
                [{ text: 'Serial Number:', bold: true }, `${radio?.serialNumber}`, { text: 'Under Warranty:', bold: true }, `${underWarranty}`],
              ]
            },
            margin: [0, 0, 0, 7] // Bottom margin
          },
          {
            // Sub-header: Timeline
            text: 'Timeline:',
            style: 'subheader',
            margin: [0, 3, 0, 3]
          },
          {
            table: {
              widths: ['*', '*', '*', '*'],
              body: [
                [{ text: 'Date Purchased:', bold: true }, `${fdatePurchased}`, { text: 'Date Received:', bold: true }, `${fDateRec}`],
                [{ text: 'Date Sent to Tech:', bold: true }, `${fDateSentTech}`, { text: 'Date Received from Tech:', bold: true }, `${fDateRecTech}`],
                [{ text: 'Date Sent to End User:', bold: true }, `${fDateSentEU}`, '', '']
              ]
            },
            margin: [0, 0, 0, 7] // Bottom margin
          },
          {
            // Sub-header: PO Tracking
            text: 'PO Tracking:',
            style: 'subheader',
            margin: [0, 3, 0, 3]
          },
          {
            table: {
              widths: ['*', '*', '*', '*', '*', '*'],
              body: [
                [{ text: 'End User PO:', bold: true }, `${repair.endUserPO}`, { text: 'Customer PO:', bold: true }, `${repair.raaPO}`, { text: 'Control ID:', bold: true }, `${repair.repairTag}`],
              ]
            },
            margin: [0, 0, 0, 7] // Bottom margin
          },
          {
            // Sub-header: Invoicing
            text: 'Invoicing:',
            style: 'subheader',
            margin: [0, 3, 0, 3]
          },
          {
            table: {
              widths: ['*', '*', '*', '*'],
              body: [
                [{ text: 'RAA Invoice Number:', bold: true }, `${repair.raaInvNum}`, { text: 'Tech Invoice Number:', bold: true }, `${repair.techInvNum}`],
              ]
            },
            margin: [0, 0, 0, 7] // Bottom margin
          },
          {
            table: {
              body: [
                [
                  {
                    // Sub-header "Symptoms"
                    text: 'Symptoms:',
                    style: 'subheader',
                    margin: [0, 3, 0, 3] // Top and bottom margin
                  },
                  {
                    ul: [
                      ...repair.symptoms.map(symptom => ({ text: symptom || '____________ \n____________ \n____________' }))
                    ]
                  }
                ]
              ],
              widths: ['15%', '85%'],
            },
            margin: [0, 0, 0, 7]
          },
          {
            table: {
              body: [
                [
                  {
                    // Sub-header "Accessories"
                    text: 'Accessories:',
                    style: 'subheader',
                    margin: [0, 3, 0, 3] // Top and bottom margin
                  },
                  {
                    ul: [
                      ...repair.accessories.map(accessory => ({ text: accessory || '____________ \n____________ \n____________' }))
                    ]
                  }
                ]
              ],
              widths: ['15%', '85%'],
            },
            margin: [0, 0, 0, 7]

          },
          {
            table: {
              body: [
                [{ text: 'Attribute', bold: true }, { text: 'IN', bold: true }, { text: 'OUT', bold: true }, { text: 'Unit', bold: true }, { text: 'Test Freq', bold: true },],
                [{ text: 'RX Sensitivity', bold: true }, `${repair.incRxSens}`, `${repair.outRxSens}`, 'uV', `${repair.testFreq}`],
                [{ text: 'Freq Err', bold: true }, `${repair.incFreqErr}`, `${repair.outFreqErr}`, 'Hz', `${repair.testFreq}`],
                [{ text: 'Modulation', bold: true }, `${repair.incMod}`, `${repair.outMod}`, 'KHz', `${repair.testFreq}`],
                [{ text: 'Power Output', bold: true }, `${repair.incPowerOut}`, `${repair.outPowerOut}`, 'Watts', `${repair.testFreq}`]
              ],
              widths: ['*', '*', '*', '*', '*'],
            },
            margin: [0, 3, 0, 3] // Top and bottom margin

          },
          {
            table: {
              body: [
                [
                  {
                    // Sub-header "Work Performed"
                    text: 'Work Performed:',
                    style: 'subheader',
                    margin: [0, 3, 0, 3] // Top and bottom margin
                  },
                  {
                    ul: [
                      ...repair.workPerformed.map(work => ({ text: work || '____________ \n____________ \n____________' }))
                    ]
                  }
                ]
              ],
              widths: ['15%', '85%'],
            },
            margin: [0, 0, 0, 7]

          },

          {
            table: {
              headerRows: 1,
              body: [
                // Header row
                [{ text: 'Parts Used', bold: true }, { text: `Repair Hours: ${repair.repHours}`, bold: true }],
                // Data rows
                [
                  {
                    ul: [
                      ...repair.partsUsed.map(part => ({ text: part || '________________________________________________________ \n________________________________________________________ \n________________________________________________________' }))
                    ]
                  },
                  ''
                ]
              ],
              widths: ['80%', '20%'],
              layout: this.edgeAndHeaderBorders
            },
            margin: [0, 3, 0, 3] // Top and bottom margin

          },

          {
            table: {
              body: [
                [{ text: 'Remarks', bold: true }],
                [`${repair.remarks || '\n \n'}`]
              ],
              widths: ['*'],
              layout: this.minHeightTable,
            },
            margin: [0, 3, 0, 3] // Top and bottom margin

          },
          {
            table: {
              body: [
                ['Technician _______________', 'License # _______________', 'Date _______________']
              ],
              widths: ['*', '*', '*'],
              layout: 'noBorders',
            },
            margin: [0, 3, 0, 3] // Top and bottom margin

          }
        ]
      }
    ];

    return {
      content,
      styles: {
        header: {
          fontSize: 12,
          bold: true,
          lineHeight: 1.5
        },
        subheader: {
          fontSize: 9,
          bold: true,
          lineHeight: 1.25
        },
        bodyTable: {
          fontSize: 8,
          margin: [0, 0, 0, 15]
        }
      },
      defaultStyle: {
        fontSize: 8,
        columnGap: 15,
        lineHeight: 1
      },
      layout: {
        edgeBordersLayout: this.edgeBordersLayout,
        edgeAndHeaderBorders: this.edgeAndHeaderBorders,
        minHeightTable: this.minHeightTable
      }
    };
  }

  repairPDFGen(repairDef: any): void {
    pdfMake.createPdf(repairDef).open();
  }

  constructor() { }
}
