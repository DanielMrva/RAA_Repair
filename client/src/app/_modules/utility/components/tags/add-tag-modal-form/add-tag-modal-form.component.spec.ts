import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTagModalFormComponent } from './add-tag-modal-form.component';

describe('AddTagModalFormComponent', () => {
  let component: AddTagModalFormComponent;
  let fixture: ComponentFixture<AddTagModalFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddTagModalFormComponent]
    });
    fixture = TestBed.createComponent(AddTagModalFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
