import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRadioComponent } from './admin-radio.component';

describe('AdminRadioComponent', () => {
  let component: AdminRadioComponent;
  let fixture: ComponentFixture<AdminRadioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminRadioComponent]
    });
    fixture = TestBed.createComponent(AdminRadioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
