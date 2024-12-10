import { TestBed } from '@angular/core/testing';

import { AddPartModalService } from './add-part-modal.service';

describe('AddPartModalService', () => {
  let service: AddPartModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddPartModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
