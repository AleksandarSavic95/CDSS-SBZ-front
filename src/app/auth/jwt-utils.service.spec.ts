import { TestBed, inject } from '@angular/core/testing';

import { JWTUtilsService } from './jwt-utils.service';

describe('JWTUtilsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [JWTUtilsService]
    });
  });

  it('should be created', inject([JWTUtilsService], (service: JWTUtilsService) => {
    expect(service).toBeTruthy();
  }));
});
