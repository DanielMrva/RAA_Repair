import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPartModalFormComponent } from './add-part-modal-form.component';

describe('AddPartModalFormComponent', () => {
  let component: AddPartModalFormComponent;
  let fixture: ComponentFixture<AddPartModalFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddPartModalFormComponent]
    });
    fixture = TestBed.createComponent(AddPartModalFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
