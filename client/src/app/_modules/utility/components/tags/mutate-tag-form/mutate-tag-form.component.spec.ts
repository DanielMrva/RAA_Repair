import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MutateTagFormComponent } from './mutate-tag-form.component';

describe('MutateTagFormComponent', () => {
  let component: MutateTagFormComponent;
  let fixture: ComponentFixture<MutateTagFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MutateTagFormComponent]
    });
    fixture = TestBed.createComponent(MutateTagFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
