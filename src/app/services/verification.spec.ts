import { TestBed } from '@angular/core/testing';

import { Verification } from './verification';

describe('Verification', () => {
  let service: Verification;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Verification);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
