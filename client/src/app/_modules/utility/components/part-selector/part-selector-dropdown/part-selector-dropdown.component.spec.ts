import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartSelectorDropdownComponent } from './part-selector-dropdown.component';

describe('PartSelectorDropdownComponent', () => {
  let component: PartSelectorDropdownComponent;
  let fixture: ComponentFixture<PartSelectorDropdownComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PartSelectorDropdownComponent]
    });
    fixture = TestBed.createComponent(PartSelectorDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
