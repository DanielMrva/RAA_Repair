import { TestBed } from '@angular/core/testing';

import { RerpairService } from './rerpair.service';

describe('RerpairService', () => {
  let service: RerpairService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RerpairService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
