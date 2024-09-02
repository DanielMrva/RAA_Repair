import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepairStatDropdownComponent } from './repair-stat-dropdown.component';

describe('RepairStatDropdownComponent', () => {
  let component: RepairStatDropdownComponent;
  let fixture: ComponentFixture<RepairStatDropdownComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RepairStatDropdownComponent]
    });
    fixture = TestBed.createComponent(RepairStatDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
