import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceTxtBtnComponent } from './invoice-txt-btn.component';

describe('InvoiceTxtBtnComponent', () => {
  let component: InvoiceTxtBtnComponent;
  let fixture: ComponentFixture<InvoiceTxtBtnComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InvoiceTxtBtnComponent]
    });
    fixture = TestBed.createComponent(InvoiceTxtBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
