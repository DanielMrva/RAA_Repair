import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepairResultsPageComponent } from './repair-results-page.component';

describe('RepairResultsPageComponent', () => {
  let component: RepairResultsPageComponent;
  let fixture: ComponentFixture<RepairResultsPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RepairResultsPageComponent]
    });
    fixture = TestBed.createComponent(RepairResultsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
