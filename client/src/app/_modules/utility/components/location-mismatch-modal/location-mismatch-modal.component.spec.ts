import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationMismatchModalComponent } from './location-mismatch-modal.component';

describe('LocationMismatchModalComponent', () => {
  let component: LocationMismatchModalComponent;
  let fixture: ComponentFixture<LocationMismatchModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LocationMismatchModalComponent]
    });
    fixture = TestBed.createComponent(LocationMismatchModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
