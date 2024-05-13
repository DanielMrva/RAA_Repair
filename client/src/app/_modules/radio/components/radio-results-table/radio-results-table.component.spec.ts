import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RadioResultsTableComponent } from './radio-results-table.component';

describe('RadioResultsTableComponent', () => {
  let component: RadioResultsTableComponent;
  let fixture: ComponentFixture<RadioResultsTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RadioResultsTableComponent]
    });
    fixture = TestBed.createComponent(RadioResultsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
