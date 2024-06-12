import { Component, Input, OnInit, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { Store } from '@ngrx/store';
import { AppState } from '@app/_store/app.state';
import { Observable } from 'rxjs';
import { selectAccessLevel } from '@app/_store/_auth-store/auth.selectors';

@Component({
  selector: 'app-repair-status-dropdown',
  templateUrl: './repair-status-dropdown.component.html',
  styleUrls: ['./repair-status-dropdown.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RepairStatusDropdownComponent),
      multi: true
    }
  ]
})
export class RepairStatusDropdownComponent implements OnInit, ControlValueAccessor {
  @Input() initialStatus: string | null = null;

  userAccessLevel$: Observable<string | null>;

  statuses: string[] = [];
  selectedStatus: string = '';

  userStatuses = [
    'Sent to RAA via FedEx',
    'Sent to RAA via UPS',
    'Sent to RAA via USPS',
    'Sent to RAA via Other (Specify)'
  ];

  adminStatuses = [
    'Radio received by R.A.A.',
    'Radio sent to Technician',
    'Radio received from Technician',
    'Radio sent to Customer'
  ];

  techStatuses = [
    'Radio received from R.A.A. by Technician',
    'Radio repair awaiting parts',
    'Radio repair in process',
    'Radio repair complete',
    'Radio sent to R.A.A.'
  ];

  otherShippingMethod: string = '';

  onChange = (value: any) => {};
  onTouched = () => {};

  constructor(private store: Store<AppState>) {
    this.userAccessLevel$ = this.store.select(selectAccessLevel);
  }

  ngOnInit(): void {
    this.userAccessLevel$.subscribe(accessLevel => {
      this.updateStatuses(accessLevel);
      if(this.initialStatus) {
        this.addInitialStatus(this.initialStatus);
        this.selectedStatus = this.initialStatus;
        if (this.selectedStatus.startsWith('Sent to RAA via Other')) {
          this.otherShippingMethod = this.selectedStatus.split(': ')[1] || '';
        }
      }
      this.onChange(this.selectedStatus);
    });

  }

  // ngOnChanges(changes: SimpleChanges): void {
  //   if (changes['initialStatus']) {
  //     this.addInitialStatus(this.initialStatus || '');
  //     this.selectedStatus = this.initialStatus || '';
  //     this.onChange(this.selectedStatus);
  //     console.log('Initial status:', this.initialStatus);
  //   }
  // }

  updateStatuses(accessLevel: string | null): void {
    switch (accessLevel) {
      case 'admin':
        this.statuses = [...this.userStatuses, ...this.adminStatuses, ...this.techStatuses];
        break;
      case 'tech':
        this.statuses = [...this.techStatuses];
        break;
      case 'user':
      default:
        this.statuses = [...this.userStatuses];
        break;
    }
  }

  // addInitialStatus(status: string): void {
  //   if (status && !this.statuses.includes(status)) {
  //     this.statuses.push(status);
  //     console.log('Added status:', status);
  //   } else {
  //     console.log('No status added or status already exists');
  //   }
  // }

  addInitialStatus(status: string): void {
    if (status && !this.statuses.includes(status)) {
      this.statuses.push(status);
    }
  }

  writeValue(value: any): void {
    if (value) {
      this.selectedStatus = value;
      if (value.startsWith('Sent to RAA via Other')) {
        this.otherShippingMethod = value.split(': ')[1] || '';
      }
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {}

  onStatusChange(event: MatSelectChange): void {
    this.selectedStatus = event.value;
    this.onChange(this.selectedStatus);
    if (event.value === 'Sent to RAA via Other (Specify)') {
      this.otherShippingMethod = '';
    }
  }

  onOtherShippingMethodChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.otherShippingMethod = inputElement.value;
    this.onChange(`Sent to RAA via Other (Specify): ${this.otherShippingMethod}`);
  }
}
