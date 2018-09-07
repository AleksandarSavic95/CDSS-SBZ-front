import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {PrincipalService} from './principal.service';

@Injectable()
export class UserRouteAccessService implements CanActivate {

  constructor(private router: Router,
              private principal: PrincipalService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Promise<boolean> {

    const authority = route.data['authority'];

    if (!authority) {
      return true;
    }

    return this.checkLogin(authority);
  }

  checkLogin(authority: string): boolean {
    const principal = this.principal;

    console.log(principal);
    if (principal.getIdentity() && principal.hasAuthorityDirect(authority)) {
      return true;
    }

    if (!principal.getIdentity()) {
      this.router.navigate(['login']);
    }

    return false;
  }

}
