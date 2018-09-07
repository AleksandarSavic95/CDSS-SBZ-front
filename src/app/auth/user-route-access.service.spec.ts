import {TestBed, inject} from '@angular/core/testing';

import {UserRouteAccessService} from './user-route-access.service';
import {RouterTestingModule} from '@angular/router/testing';
import {PrincipalService} from './principal.service';

describe('UserRouteAccessService', () => {
  beforeEach(() => {
    const principalServiceMock = {};
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [UserRouteAccessService,
        {provide: PrincipalService, useValue: principalServiceMock}]
    });
  });

  it('should be created', inject([UserRouteAccessService], (service: UserRouteAccessService) => {
    expect(service).toBeTruthy();
  }));
});
