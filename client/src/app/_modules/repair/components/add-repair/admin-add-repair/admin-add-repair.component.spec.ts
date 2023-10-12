import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddRepairComponent } from './admin-add-repair.component';

describe('AdminAddRepairComponent', () => {
  let component: AdminAddRepairComponent;
  let fixture: ComponentFixture<AdminAddRepairComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminAddRepairComponent]
    });
    fixture = TestBed.createComponent(AdminAddRepairComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
