import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgSelectorComponent } from './org-selector.component';

describe('OrgSelectorComponent', () => {
  let component: OrgSelectorComponent;
  let fixture: ComponentFixture<OrgSelectorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrgSelectorComponent]
    });
    fixture = TestBed.createComponent(OrgSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
