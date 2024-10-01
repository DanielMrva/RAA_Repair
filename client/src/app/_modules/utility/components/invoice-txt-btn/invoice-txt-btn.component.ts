import { Component, Input } from '@angular/core';
import { InvoiceTextAttributes } from '@app/graphql/schemas';
import { ToastService } from '@app/services/toast/toast.service';

@Component({
  selector: 'app-invoice-txt-btn',
  templateUrl: './invoice-txt-btn.component.html',
  styleUrls: ['./invoice-txt-btn.component.css']
})
export class InvoiceTxtBtnComponent {

  constructor(private toastService: ToastService) { }

  @Input() invoiceContent!: InvoiceTextAttributes;

  concatInvoiceText(): string {
    const { make, model, serialNumber, repairTag, workPerformed} = this.invoiceContent;

    const workPerformedString = workPerformed.join(', ')

    return `Service Labor to Repair: ${make}, ${model}, S/N: ${serialNumber}, Repair Tag: ${repairTag}, Work Performed: ${workPerformedString}`
  };

  copyInvoiceTextToClipboard() {
    const textToCopy = this.concatInvoiceText();

    navigator.clipboard.writeText(textToCopy).then(() => {
      this.toastService.show('Invoice Text copied to clipboard', { classname: 'bg-success text-light', delay: 3000})
    }, (err) => {
      console.error(`Could not copy text: ${err}`);
      this.toastService.show(`Failed to copy text`, { classname: `bg-danger text-light`, delay: 3000})
    })
  }

// --Field two: "Invoice Text" ("Service Labor to Repair:" Make, Model, "Serial NO:" radioSerial  "Repair Tag:" RepairTag)



}
