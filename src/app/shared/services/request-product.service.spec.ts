import { TestBed } from '@angular/core/testing';

import { RequestProductService } from './request-product.service';

describe('RequestProductService', () => {
  let service: RequestProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RequestProductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
