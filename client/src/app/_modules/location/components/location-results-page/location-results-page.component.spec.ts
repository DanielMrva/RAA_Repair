import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationResultsPageComponent } from './location-results-page.component';

describe('LocationResultsPageComponent', () => {
  let component: LocationResultsPageComponent;
  let fixture: ComponentFixture<LocationResultsPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LocationResultsPageComponent]
    });
    fixture = TestBed.createComponent(LocationResultsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
