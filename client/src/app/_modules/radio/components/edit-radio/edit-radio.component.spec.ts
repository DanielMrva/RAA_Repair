import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRadioComponent } from './edit-radio.component';

describe('EditRadioComponent', () => {
  let component: EditRadioComponent;
  let fixture: ComponentFixture<EditRadioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditRadioComponent]
    });
    fixture = TestBed.createComponent(EditRadioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
