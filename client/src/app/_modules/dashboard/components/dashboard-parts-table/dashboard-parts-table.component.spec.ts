import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardPartsTableComponent } from './dashboard-parts-table.component';

describe('DashboardPartsTableComponent', () => {
  let component: DashboardPartsTableComponent;
  let fixture: ComponentFixture<DashboardPartsTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardPartsTableComponent]
    });
    fixture = TestBed.createComponent(DashboardPartsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
