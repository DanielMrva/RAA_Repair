import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OneRadioComponent } from './one-radio.component';

describe('OneRadioComponent', () => {
  let component: OneRadioComponent;
  let fixture: ComponentFixture<OneRadioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OneRadioComponent]
    });
    fixture = TestBed.createComponent(OneRadioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
