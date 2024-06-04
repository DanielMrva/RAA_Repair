import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationResultsTableComponent } from './location-results-table.component';

describe('LocationResultsTableComponent', () => {
  let component: LocationResultsTableComponent;
  let fixture: ComponentFixture<LocationResultsTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LocationResultsTableComponent]
    });
    fixture = TestBed.createComponent(LocationResultsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
