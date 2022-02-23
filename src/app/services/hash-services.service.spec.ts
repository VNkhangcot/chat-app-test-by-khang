import { TestBed } from '@angular/core/testing';

import { HashProviderService } from './hash-services.service';

describe('HashProviderService', () => {
  let service: HashProviderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HashProviderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
