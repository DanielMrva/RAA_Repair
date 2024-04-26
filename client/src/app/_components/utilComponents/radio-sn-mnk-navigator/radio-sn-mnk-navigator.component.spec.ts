import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RadioSnMNkNavigatorComponent } from './radio-sn-mnk-navigator.component';

describe('RadioSnMNkNavigatorComponent', () => {
  let component: RadioSnMNkNavigatorComponent;
  let fixture: ComponentFixture<RadioSnMNkNavigatorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RadioSnMNkNavigatorComponent]
    });
    fixture = TestBed.createComponent(RadioSnMNkNavigatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
