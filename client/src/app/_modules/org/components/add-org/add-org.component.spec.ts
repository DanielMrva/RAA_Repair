import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOrgComponent } from './add-org.component';

describe('AddOrgComponent', () => {
  let component: AddOrgComponent;
  let fixture: ComponentFixture<AddOrgComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddOrgComponent]
    });
    fixture = TestBed.createComponent(AddOrgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
