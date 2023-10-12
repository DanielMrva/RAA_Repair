import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddRadioComponent } from './admin-add-radio.component';

describe('AdminAddRadioComponent', () => {
  let component: AdminAddRadioComponent;
  let fixture: ComponentFixture<AdminAddRadioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminAddRadioComponent]
    });
    fixture = TestBed.createComponent(AdminAddRadioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
