import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgByTagNameNavigatorComponent } from './org-by-tag-name-navigator.component';

describe('OrgByTagNameNavigatorComponent', () => {
  let component: OrgByTagNameNavigatorComponent;
  let fixture: ComponentFixture<OrgByTagNameNavigatorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrgByTagNameNavigatorComponent]
    });
    fixture = TestBed.createComponent(OrgByTagNameNavigatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
