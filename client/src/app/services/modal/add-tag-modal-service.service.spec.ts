import { TestBed } from '@angular/core/testing';

import { AddTagModalService } from './mutate-tag-modal.service';

describe('AddTagModalServiceSe', () => {
  let service: AddTagModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddTagModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
