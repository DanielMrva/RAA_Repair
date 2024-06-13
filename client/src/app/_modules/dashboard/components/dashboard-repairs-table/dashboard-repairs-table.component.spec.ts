import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardRepairsTableComponent } from './dashboard-repairs-table.component';

describe('DashboardRepairsTableComponent', () => {
  let component: DashboardRepairsTableComponent;
  let fixture: ComponentFixture<DashboardRepairsTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardRepairsTableComponent]
    });
    fixture = TestBed.createComponent(DashboardRepairsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
