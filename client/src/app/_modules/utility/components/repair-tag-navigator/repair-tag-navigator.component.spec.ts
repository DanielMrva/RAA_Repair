import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepairTagNavigatorComponent } from './repair-tag-navigator.component';

describe('RepairTagNavigatorComponent', () => {
  let component: RepairTagNavigatorComponent;
  let fixture: ComponentFixture<RepairTagNavigatorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RepairTagNavigatorComponent]
    });
    fixture = TestBed.createComponent(RepairTagNavigatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
