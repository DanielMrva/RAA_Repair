import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoTextButtonComponent } from './po-text-button.component';

describe('PoTextButtonComponent', () => {
  let component: PoTextButtonComponent;
  let fixture: ComponentFixture<PoTextButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PoTextButtonComponent]
    });
    fixture = TestBed.createComponent(PoTextButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
