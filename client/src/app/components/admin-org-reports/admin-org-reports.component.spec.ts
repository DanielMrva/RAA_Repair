import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminOrgReportsComponent } from './admin-org-reports.component';

describe('AdminOrgReportsComponent', () => {
  let component: AdminOrgReportsComponent;
  let fixture: ComponentFixture<AdminOrgReportsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminOrgReportsComponent]
    });
    fixture = TestBed.createComponent(AdminOrgReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
