import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRepairFormComponent } from './add-repair-form.component';

describe('AddRepairFormComponent', () => {
  let component: AddRepairFormComponent;
  let fixture: ComponentFixture<AddRepairFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddRepairFormComponent]
    });
    fixture = TestBed.createComponent(AddRepairFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
