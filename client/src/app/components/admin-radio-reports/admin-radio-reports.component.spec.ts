import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRadioReportsComponent } from './admin-radio-reports.component';

describe('AdminRadioReportsComponent', () => {
  let component: AdminRadioReportsComponent;
  let fixture: ComponentFixture<AdminRadioReportsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminRadioReportsComponent]
    });
    fixture = TestBed.createComponent(AdminRadioReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
