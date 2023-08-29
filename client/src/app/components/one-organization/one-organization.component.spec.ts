import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OneOrganizationComponent } from './one-organization.component';

describe('OneOrganizationComponent', () => {
  let component: OneOrganizationComponent;
  let fixture: ComponentFixture<OneOrganizationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OneOrganizationComponent]
    });
    fixture = TestBed.createComponent(OneOrganizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
