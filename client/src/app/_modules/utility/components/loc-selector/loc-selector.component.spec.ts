import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocSelectorComponent } from './loc-selector.component';

describe('LocSelectorComponent', () => {
  let component: LocSelectorComponent;
  let fixture: ComponentFixture<LocSelectorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LocSelectorComponent]
    });
    fixture = TestBed.createComponent(LocSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
