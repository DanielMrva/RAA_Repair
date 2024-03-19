import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgLocationSelectorComponent } from './org-location-selector.component';

describe('OrgLocationSelectorComponent', () => {
  let component: OrgLocationSelectorComponent;
  let fixture: ComponentFixture<OrgLocationSelectorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrgLocationSelectorComponent]
    });
    fixture = TestBed.createComponent(OrgLocationSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
