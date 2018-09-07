import {Injectable} from '@angular/core';
import {LocalStorageService} from 'ng2-webstorage';
import {Observable, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {JWTUtilsService} from './jwt-utils.service';


@Injectable()
export class AuthServerProvider {

  constructor(private http: HttpClient,
              private $localStorage: LocalStorageService,
              private jwtUtils: JWTUtilsService) {
  }

  getToken() {
    return this.$localStorage.retrieve('authenticationToken');
  }

  storeAuthenticationToken(jwt) {
    this.$localStorage.store('authenticationToken', jwt);
    this.$localStorage.clear('user');
    this.$localStorage.store('user', this.jwtUtils.getDecodedData(jwt));
  }

  getCurrentUser(): Observable<any> {

    const user = this.$localStorage.retrieve('user');

    if (user === '' || user === undefined) {
      return null;
    }
    return of(user);
  }

}
