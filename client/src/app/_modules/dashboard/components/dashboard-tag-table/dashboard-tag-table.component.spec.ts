import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardTagTableComponent } from './dashboard-tag-table.component';

describe('DashboardTagTableComponent', () => {
  let component: DashboardTagTableComponent;
  let fixture: ComponentFixture<DashboardTagTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardTagTableComponent]
    });
    fixture = TestBed.createComponent(DashboardTagTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
