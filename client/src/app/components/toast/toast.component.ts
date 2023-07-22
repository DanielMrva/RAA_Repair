import { Component, TemplateRef } from '@angular/core';
import { NgFor, NgIf, NgTemplateOutlet } from '@angular/common';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastService } from '@app/services/toast/toast.service';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [NgbToastModule, NgIf, NgTemplateOutlet, NgFor],
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css'],
  host: {class: 'toast-container position-fixed top-0 end-0 p-3', style: 'z-index: 1200'}
})
export class ToastComponent {

  constructor(
    public toastService: ToastService
  ) {}
  isTemplate(toast: { textOrTpl: any; }) {
    return toast.textOrTpl instanceof TemplateRef;
  }
}
