import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RadioResultsPageComponent } from './radio-results-page.component';

describe('RadioResultsPageComponent', () => {
  let component: RadioResultsPageComponent;
  let fixture: ComponentFixture<RadioResultsPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RadioResultsPageComponent]
    });
    fixture = TestBed.createComponent(RadioResultsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
