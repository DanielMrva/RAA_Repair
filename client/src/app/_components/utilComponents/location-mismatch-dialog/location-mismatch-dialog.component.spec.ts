import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationMismatchDialogComponent } from './location-mismatch-dialog.component';

describe('LocationMismatchDialogComponent', () => {
  let component: LocationMismatchDialogComponent;
  let fixture: ComponentFixture<LocationMismatchDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LocationMismatchDialogComponent]
    });
    fixture = TestBed.createComponent(LocationMismatchDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
