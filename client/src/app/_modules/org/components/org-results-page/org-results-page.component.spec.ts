import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgResultsPageComponent } from './org-results-page.component';

describe('OrgResultsPageComponent', () => {
  let component: OrgResultsPageComponent;
  let fixture: ComponentFixture<OrgResultsPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrgResultsPageComponent]
    });
    fixture = TestBed.createComponent(OrgResultsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
