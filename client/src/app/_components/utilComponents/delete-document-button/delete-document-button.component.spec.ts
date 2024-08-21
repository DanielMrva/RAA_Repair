import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteDocumentButtonComponent } from './delete-document-button.component';

describe('DeleteDocumentButtonComponent', () => {
  let component: DeleteDocumentButtonComponent;
  let fixture: ComponentFixture<DeleteDocumentButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteDocumentButtonComponent]
    });
    fixture = TestBed.createComponent(DeleteDocumentButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
