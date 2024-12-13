import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDocumentButtonComponent } from './edit-document-button.component';

describe('EditDocumentButtonComponent', () => {
  let component: EditDocumentButtonComponent;
  let fixture: ComponentFixture<EditDocumentButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditDocumentButtonComponent]
    });
    fixture = TestBed.createComponent(EditDocumentButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
