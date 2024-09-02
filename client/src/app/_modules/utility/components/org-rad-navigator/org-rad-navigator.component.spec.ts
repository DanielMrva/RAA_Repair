import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgRadNavigatorComponent } from './org-rad-navigator.component';

describe('OrgRadNavigatorComponent', () => {
  let component: OrgRadNavigatorComponent;
  let fixture: ComponentFixture<OrgRadNavigatorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrgRadNavigatorComponent]
    });
    fixture = TestBed.createComponent(OrgRadNavigatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
