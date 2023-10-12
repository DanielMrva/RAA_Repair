import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OneOrgComponent } from './one-org.component';

describe('OneOrgComponent', () => {
  let component: OneOrgComponent;
  let fixture: ComponentFixture<OneOrgComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OneOrgComponent]
    });
    fixture = TestBed.createComponent(OneOrgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
