import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LittleTagComponent } from './little-tag.component';

describe('LittleTagComponent', () => {
  let component: LittleTagComponent;
  let fixture: ComponentFixture<LittleTagComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LittleTagComponent]
    });
    fixture = TestBed.createComponent(LittleTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
