import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgRadiosNavigatorComponent } from './org-radios-navigator.component';

describe('OrgRadiosNavigatorComponent', () => {
  let component: OrgRadiosNavigatorComponent;
  let fixture: ComponentFixture<OrgRadiosNavigatorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrgRadiosNavigatorComponent]
    });
    fixture = TestBed.createComponent(OrgRadiosNavigatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
