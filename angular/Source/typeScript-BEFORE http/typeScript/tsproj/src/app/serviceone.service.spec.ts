import { TestBed } from '@angular/core/testing';

import { ServiceoneService } from './serviceone.service';

describe('ServiceoneService', () => {
  let service: ServiceoneService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceoneService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
