import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgResultsTableComponent } from './org-results-table.component';

describe('OrgResultsTableComponent', () => {
  let component: OrgResultsTableComponent;
  let fixture: ComponentFixture<OrgResultsTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrgResultsTableComponent]
    });
    fixture = TestBed.createComponent(OrgResultsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
