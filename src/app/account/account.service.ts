import {Injectable} from '@angular/core';
import {LocalStorageService} from 'ng2-webstorage';
import {HttpClient} from '@angular/common/http';
import {map, catchError} from 'rxjs/operators';
import {JWTUtilsService} from '../auth/jwt-utils.service';
import {AuthServerProvider} from '../auth/auth-jwt.service';
import {PrincipalService} from '../auth/principal.service';


@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient,
              private $localStorage: LocalStorageService,
              private jwtUtilsService: JWTUtilsService,
              private authServerProvider: AuthServerProvider,
              private principalService: PrincipalService) {
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred - Account Service', error);
    return Promise.reject(error.error || error);
  }


  login(account) {
    return this.http.post('/api/login', account, {responseType: 'text'})
      .pipe(map(resp => {
        const accessToken = resp;
        this.authServerProvider.storeAuthenticationToken(accessToken);
        this.principalService.authenticate(this.jwtUtilsService.getDecodedData(accessToken));
      }), catchError(this.handleError));
  }

  logout() {
    this.$localStorage.clear('authenticationToken');
    this.$localStorage.clear('user');
    this.principalService.removeIdentity();
  }

  register(account) {
    return this.http.post('/api/registration', account, {responseType: 'text'});
  }

}
