import { TestBed } from '@angular/core/testing';

import { UserAuthenticatedService } from './user-authenticated.service';

describe('UserAuthenticatedService', () => {
  let service: UserAuthenticatedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserAuthenticatedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
