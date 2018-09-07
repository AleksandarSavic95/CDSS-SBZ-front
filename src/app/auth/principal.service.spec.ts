import {inject, TestBed} from '@angular/core/testing';

import {PrincipalService} from './principal.service';
import {JWTUtilsService} from './jwt-utils.service';

describe('PrincipalService', () => {
  beforeEach(() => {
    const jwtUtilsServiceMock = {};
    const principalServiceMock = {};
    TestBed.configureTestingModule({
      providers: [PrincipalService,
        {provide: JWTUtilsService, useValue: jwtUtilsServiceMock},
        {provide: PrincipalService, useValue: principalServiceMock}]
    });
  });

  it('should be created', inject([PrincipalService], (service: PrincipalService) => {
    expect(service).toBeTruthy();
  }));
});
