import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEditRepairComponent } from './admin-edit-repair.component';

describe('AdminEditRepairComponent', () => {
  let component: AdminEditRepairComponent;
  let fixture: ComponentFixture<AdminEditRepairComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminEditRepairComponent]
    });
    fixture = TestBed.createComponent(AdminEditRepairComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
