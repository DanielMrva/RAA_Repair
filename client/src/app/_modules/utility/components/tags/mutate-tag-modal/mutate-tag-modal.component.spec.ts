import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MutateTagModalComponent } from './mutate-tag-modal.component';

describe('MutateTagModalComponent', () => {
  let component: MutateTagModalComponent;
  let fixture: ComponentFixture<MutateTagModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MutateTagModalComponent]
    });
    fixture = TestBed.createComponent(MutateTagModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
