import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepairResultsTableComponent } from './repair-results-table.component';

describe('RepairResultsTableComponent', () => {
  let component: RepairResultsTableComponent;
  let fixture: ComponentFixture<RepairResultsTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RepairResultsTableComponent]
    });
    fixture = TestBed.createComponent(RepairResultsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
