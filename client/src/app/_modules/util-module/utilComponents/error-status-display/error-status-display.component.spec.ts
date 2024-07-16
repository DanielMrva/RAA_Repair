import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorStatusDisplayComponent } from './error-status-display.component';

describe('ErrorStatusDisplayComponent', () => {
  let component: ErrorStatusDisplayComponent;
  let fixture: ComponentFixture<ErrorStatusDisplayComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ErrorStatusDisplayComponent]
    });
    fixture = TestBed.createComponent(ErrorStatusDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
