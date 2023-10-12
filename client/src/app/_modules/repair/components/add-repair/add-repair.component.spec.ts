import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRepairComponent } from './add-repair.component';

describe('AddRepairComponent', () => {
  let component: AddRepairComponent;
  let fixture: ComponentFixture<AddRepairComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddRepairComponent]
    });
    fixture = TestBed.createComponent(AddRepairComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
