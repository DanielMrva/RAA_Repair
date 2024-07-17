import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRepairFormComponent } from './edit-repair-form.component';

describe('EditRepairFormComponent', () => {
  let component: EditRepairFormComponent;
  let fixture: ComponentFixture<EditRepairFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditRepairFormComponent]
    });
    fixture = TestBed.createComponent(EditRepairFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
