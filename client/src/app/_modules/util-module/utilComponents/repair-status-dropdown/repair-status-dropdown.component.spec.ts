import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepairStatusDropdownComponent } from './repair-status-dropdown.component';

describe('RepairStatusDropdownComponent', () => {
  let component: RepairStatusDropdownComponent;
  let fixture: ComponentFixture<RepairStatusDropdownComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RepairStatusDropdownComponent]
    });
    fixture = TestBed.createComponent(RepairStatusDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
