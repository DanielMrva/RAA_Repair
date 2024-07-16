import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-error-status-display',
  templateUrl: './error-status-display.component.html',
  styleUrls: ['./error-status-display.component.css']
})
export class ErrorStatusDisplayComponent {

  @Input() error: string | null = null;

}
