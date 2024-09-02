import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgLocSelectorComponent } from './org-loc-selector.component';

describe('OrgLocSelectorComponent', () => {
  let component: OrgLocSelectorComponent;
  let fixture: ComponentFixture<OrgLocSelectorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrgLocSelectorComponent]
    });
    fixture = TestBed.createComponent(OrgLocSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
