import {inject, TestBed} from '@angular/core/testing';

import {AuthServerProvider} from './auth-jwt.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {HttpClientModule} from '@angular/common/http';
import {LocalStorageService} from 'ng2-webstorage';
import {CookieService} from 'ngx-cookie-service';
import {JWTUtilsService} from './jwt-utils.service';

describe('AuthServerProvider', () => {
  beforeEach(() => {
    const localStorageMock = {};
    const cookieServiceMock = {};
    const jwtUtilsMock = {};
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        HttpClientTestingModule],
      providers: [AuthServerProvider,
        {provide: LocalStorageService, useValue: localStorageMock},
        {provide: CookieService, useValue: cookieServiceMock},
        {provide: JWTUtilsService, useValue: jwtUtilsMock}]
    });
  });

  it('should be created', inject([AuthServerProvider], (service: AuthServerProvider) => {
    expect(service).toBeTruthy();
  }));
});
