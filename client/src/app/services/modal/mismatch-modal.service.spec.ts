import { TestBed } from '@angular/core/testing';

import { MismatchModalService } from './mismatch-modal.service';

describe('MismatchModalService', () => {
  let service: MismatchModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MismatchModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
