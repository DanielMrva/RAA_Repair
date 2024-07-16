import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepairByTagNavigatorComponent } from './repair-by-tag-navigator.component';

describe('RepairByTagNavigatorComponent', () => {
  let component: RepairByTagNavigatorComponent;
  let fixture: ComponentFixture<RepairByTagNavigatorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RepairByTagNavigatorComponent]
    });
    fixture = TestBed.createComponent(RepairByTagNavigatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
