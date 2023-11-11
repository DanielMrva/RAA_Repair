import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OneRepairComponent } from './one-repair.component';

describe('OneRepairComponent', () => {
  let component: OneRepairComponent;
  let fixture: ComponentFixture<OneRepairComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OneRepairComponent]
    });
    fixture = TestBed.createComponent(OneRepairComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
