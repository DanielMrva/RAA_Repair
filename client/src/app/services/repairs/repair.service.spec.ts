import { TestBed } from '@angular/core/testing';

import { RepairService } from './repair.service';

describe('RerpairService', () => {
  let service: RepairService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RepairService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
