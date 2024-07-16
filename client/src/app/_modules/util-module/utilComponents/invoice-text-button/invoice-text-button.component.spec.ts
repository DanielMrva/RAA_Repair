import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceTextButtonComponent } from './invoice-text-button.component';

describe('InvoiceTextButtonComponent', () => {
  let component: InvoiceTextButtonComponent;
  let fixture: ComponentFixture<InvoiceTextButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InvoiceTextButtonComponent]
    });
    fixture = TestBed.createComponent(InvoiceTextButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
