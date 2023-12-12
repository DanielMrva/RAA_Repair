import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OneLocationComponent } from './one-location.component';

describe('OneLocationComponent', () => {
  let component: OneLocationComponent;
  let fixture: ComponentFixture<OneLocationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OneLocationComponent]
    });
    fixture = TestBed.createComponent(OneLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
