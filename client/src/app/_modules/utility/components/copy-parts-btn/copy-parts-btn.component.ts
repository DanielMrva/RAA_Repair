import { Component, Input } from '@angular/core';
import { ToastService } from '@app/services/toast/toast.service';
import { delay } from 'rxjs';

@Component({
  selector: 'app-copy-parts-btn',
  templateUrl: './copy-parts-btn.component.html',
  styleUrls: ['./copy-parts-btn.component.css']
})
export class CopyPartsBtnComponent {

  constructor(private toastService: ToastService) { }

  @Input() partsNumberString!: string;

  extractPartNumber(): string {
    const partNumberText = this.partsNumberString;

    const splitPN  = partNumberText.split(' ')
    // Assuming the part number is formatted with the number at the begining and the descrption at the end, this should extract the part number.
    return splitPN[0]
  };

  copyPartNumber() {
    const textToCopy = this.extractPartNumber();

    navigator.clipboard.writeText(textToCopy).then(() => {
      this.toastService.show(`Part Number copied to clipboard`, { className: `bg-success text-light`, delay: 3000})
    }, (err) => {
      console.error(`Could not copy text: ${err}`);
      this.toastService.show(`Failed to copy text`, { classname: `bg-danger text-light`, delay: 3000});
    })
  }

}
