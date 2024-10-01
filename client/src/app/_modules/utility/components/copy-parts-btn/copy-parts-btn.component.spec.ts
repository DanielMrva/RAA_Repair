import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CopyPartsBtnComponent } from './copy-parts-btn.component';

describe('CopyPartsBtnComponent', () => {
  let component: CopyPartsBtnComponent;
  let fixture: ComponentFixture<CopyPartsBtnComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CopyPartsBtnComponent]
    });
    fixture = TestBed.createComponent(CopyPartsBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
