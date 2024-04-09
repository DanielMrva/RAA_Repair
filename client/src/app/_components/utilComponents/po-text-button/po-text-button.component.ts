import { Component, Input } from '@angular/core';
import { PoTextAttributes } from '@app/graphql/schemas';
import { ToastService } from '@app/services/toast/toast.service';

@Component({
  selector: 'app-po-text-button',
  templateUrl: './po-text-button.component.html',
  styleUrls: ['./po-text-button.component.css']
})
export class PoTextButtonComponent {

  constructor(private toastService: ToastService) {}

  @Input() purchaseOrderContent!: PoTextAttributes;

  concatPoText(): string {
    const { make, model, serialNumber, accessories, repairTag, orgName, locationName } = this.purchaseOrderContent;

    const accessoriesText = accessories?.join(', ') || 'None';
    let orgText;
    
    if (orgName == locationName) {
      orgText = `${orgName}`
    } else {
      orgText = `${orgName}, ${locationName}`
    }

    return `Radio Repair: ${make} ${model}, Serial NO: ${serialNumber}, with ${accessoriesText}, Repair Tag: ${repairTag}, ${orgText}`
  }

  copyPoTextToClipboard() {
    const textToCopy = this.concatPoText();

    navigator.clipboard.writeText(textToCopy).then(() => {
      this.toastService.show(`PO Text copied to clipboard`, { classname: `bg-success text-light`, delay: 3000});
    }, (err) => {
      console.error(`Could not copy text: ${err}`);
      this.toastService.show(`Failed to copy text`, { classname: `bg-danger text-light`, delay: 3000});
    })
  }

  //   --Field one: "Purchase Order Text" ("Radio Repair:" Make, Model, "Serial NO:" radioSerial, "with" Accessories, "Repair Tag:" RepairTag, OrgName, IF OrgName == Location.name "" ELSE Location.name)

}
