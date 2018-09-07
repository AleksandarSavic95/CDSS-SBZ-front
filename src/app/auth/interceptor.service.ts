import {Injectable} from '@angular/core';
import {LocalStorageService} from 'ng2-webstorage';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServerURLInterceptor implements HttpInterceptor {

  constructor(private $localStorage: LocalStorageService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.getToken();

    if (token) {
      console.log(token);
      const authReq = req.clone({headers: req.headers.set('X-Auth-Token', token)});
      return next.handle(authReq);
    }

    return next.handle(req);
  }


  getToken() {
    return this.$localStorage.retrieve('authenticationToken');
  }


}
