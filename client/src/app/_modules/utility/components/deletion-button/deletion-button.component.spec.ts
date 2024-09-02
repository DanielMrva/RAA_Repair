import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletionButtonComponent } from './deletion-button.component';

describe('DeletionButtonComponent', () => {
  let component: DeletionButtonComponent;
  let fixture: ComponentFixture<DeletionButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeletionButtonComponent]
    });
    fixture = TestBed.createComponent(DeletionButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
