import { TestBed } from '@angular/core/testing';

import { DeleteDocumentService } from './delete-document.service';

describe('DeleteDocumentServiceService', () => {
  let service: DeleteDocumentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeleteDocumentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
