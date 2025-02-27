import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgTagsBadgeComponent } from './org-tags-badge.component';

describe('OrgTagsBadgeComponent', () => {
  let component: OrgTagsBadgeComponent;
  let fixture: ComponentFixture<OrgTagsBadgeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrgTagsBadgeComponent]
    });
    fixture = TestBed.createComponent(OrgTagsBadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
