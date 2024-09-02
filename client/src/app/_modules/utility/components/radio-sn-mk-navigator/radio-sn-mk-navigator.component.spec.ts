import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RadioSnMkNavigatorComponent } from './radio-sn-mk-navigator.component';

describe('RadioSnMkNavigatorComponent', () => {
  let component: RadioSnMkNavigatorComponent;
  let fixture: ComponentFixture<RadioSnMkNavigatorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RadioSnMkNavigatorComponent]
    });
    fixture = TestBed.createComponent(RadioSnMkNavigatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
