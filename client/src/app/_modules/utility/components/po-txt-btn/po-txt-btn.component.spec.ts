import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoTxtBtnComponent } from './po-txt-btn.component';

describe('PoTxtBtnComponent', () => {
  let component: PoTxtBtnComponent;
  let fixture: ComponentFixture<PoTxtBtnComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PoTxtBtnComponent]
    });
    fixture = TestBed.createComponent(PoTxtBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
