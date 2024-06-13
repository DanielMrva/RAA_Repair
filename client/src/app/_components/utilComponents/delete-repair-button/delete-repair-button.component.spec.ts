import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteRepairButtonComponent } from './delete-repair-button.component';

describe('DeleteRepairButtonComponent', () => {
  let component: DeleteRepairButtonComponent;
  let fixture: ComponentFixture<DeleteRepairButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteRepairButtonComponent]
    });
    fixture = TestBed.createComponent(DeleteRepairButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
