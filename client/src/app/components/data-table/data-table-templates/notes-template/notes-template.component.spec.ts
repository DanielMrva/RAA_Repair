import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotesTemplateComponent } from './notes-template.component';

describe('NotesTemplateComponent', () => {
  let component: NotesTemplateComponent;
  let fixture: ComponentFixture<NotesTemplateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NotesTemplateComponent]
    });
    fixture = TestBed.createComponent(NotesTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
