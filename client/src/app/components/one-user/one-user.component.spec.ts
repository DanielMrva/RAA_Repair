import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OneUserComponent } from './one-user.component';

describe('OneUserComponent', () => {
  let component: OneUserComponent;
  let fixture: ComponentFixture<OneUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OneUserComponent]
    });
    fixture = TestBed.createComponent(OneUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
