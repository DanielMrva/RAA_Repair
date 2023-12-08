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

    const content = [
      {
        text: `Repair ${repair.repairTag} Details`,
        style: 'header',
        alignment: 'center'
      },
      {
        text: `Timeline`,
        style: 'subHeader',
        alignment: 'center'
      },
      {
        columns: [
          {
            width: '*',
            text: `Date Received: ${fDateRec}`
          },
          {
            width: '*',
            text: `Date Sent Tech: ${fDateSentTech}`
          },
          {
            width: '*',
            text: `Date Received Tech: ${fDateRecTech}`
          },
          {
            width: '*',
            text: `Date Sent End User: ${fDateSentEU}`
          }
        ]
      },
      {
        text: `Inventory / PO Tracking`,
        style: 'subHeader',
        alignment: 'center'
      },
      {
        columns: [
          {
            width: '*',
            text: `RAA Invoice: ${repair.raaInvNum || `______________`}`
          },
          {
            width: '*',
            text: `RAA PO: ${repair.raaPO || `______________`}`
          },
          {
            width: '*',
            text: `End User PO: ${repair.endUserPO || `______________`}`
          }
        ]
      },
      {
        columns: [
          {
            width: '*',
            text: `Radio Serial: ${repair.radioSerial || `______________`}`
          },
          [
            'Accessories:',
            {
              ul: [
                ...repair.accessories.map(accessory => ({ text: accessory || `_________________________________ \n _________________________________ \n _________________________________ \n _________________________________ \n _________________________________ \n _________________________________ \n _________________________________ \n _________________________________\n _________________________________` }))
              ]
            }
          ]
        ]
      },
      {
        text: `Symptoms and Diagnostics`,
        style: 'subHeader',
        alignment: 'center'
      },
      {
        columns: [
          [
            'Symptoms:',
            {
              ul: [
                ...repair.symptoms.map(symptom => ({ text: symptom || '_________________________________ \n _________________________________ \n _________________________________ \n _________________________________ \n _________________________________ \n _________________________________ \n _________________________________ \n _________________________________ ' }))

              ]
            }
          ],
          [
            'Diagnostics:',
            `Test Frequency: ${repair.testFreq || '______'}`,
            {
              style: 'testTable',
              table: {
                body: [
                  ['Attribute', 'IN', 'OUT'],
                  ['RX Sensitivity', `${repair.incRxSens || '_________'}`, `${repair.outRxSens || '_________'}`],
                  ['Freq Err', `${repair.incFreqErr || '_________'}`, `${repair.outFreqErr || '_________'}`],
                  ['Modulation', `${repair.incMod || '_________'}`, `${repair.outMod || '_________'}`],
                  ['Power Output', `${repair.incPowerOut || '_________'}`, `${repair.outPowerOut || '_________'}`]
                ]
              }
            }
          ]
        ]
      },
      {
        text: `Work Details`,
        style: 'subHeader',
        alignment: 'center'
      },
      {
        columns: [
          [
            `Tech Invoice Number: ${repair.techInvNum || `__________________`}`,
            'Work Performed:',
            {
              ul: [
                ...repair.workPerformed.map(work => ({ text: work || '_______________________________ \n _______________________________ \n _______________________________ \n _______________________________ \n _______________________________ \n _______________________________ \n _______________________________ \n _______________________________ \n' }))

              ]
            }
          ],
          [
            `Repair Hours: ${repair.repHours || `__________________`}`,
            'Parts Used:',
            {
              ul: [
                ...repair.partsUsed.map(part => ({ text: part || '_______________________________ \n _______________________________ \n _______________________________ \n _______________________________ \n _______________________________ \n _______________________________ \n _______________________________ \n _______________________________ \n ' }))

              ]
            }
          ]
        ]
      },
      {
        text: `Remarks`,
        style: 'subHeader',
        alignment: 'center'
      },
      `${repair.remarks || '_______________________________________________________________________________________ \n _______________________________________________________________________________________ \n _______________________________________________________________________________________ \n _______________________________________________________________________________________ \n _______________________________________________________________________________________ \n '}`

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
        }

      },
      defaultStyle: {
        columnGap: 15,
        lineHeight: 1
      }
    }
  };

  repairPDFGen(repairDef: any): void {

    pdfMake.createPdf(repairDef).open()
  }

  constructor() { }
}
