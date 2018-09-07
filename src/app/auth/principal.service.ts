import { Injectable } from '@angular/core';
import { AuthServerProvider } from './auth-jwt.service';

@Injectable()
export class PrincipalService {

  authenticated = false;

  userIdentity: any;
  /** userIdentity example
   created:1518006964143
   exp:1518024964
   roles:Array(1)
     0:{authority: "ADMIN"}
     length:1
   sub:"admin1" */

  // this (and not just an empty constructor) makes the user stay loggedd in after a page reload
  constructor(private authJwtService: AuthServerProvider) {
    this.authJwtService.getCurrentUser().subscribe(data => this.authenticate(data));
  }

  authenticate(identity) {
    this.userIdentity = identity;
    this.authenticated = identity !== null;
  }

  removeIdentity() {
    this.userIdentity = null;
    this.authenticated = false;
  }

  // maybe helps with faster loading of some pages where it's used... it's not used anywhere at the moment
  hasAuthority(authority: string): Promise<boolean> {
    return Promise.resolve(this.hasAuthorityDirect(authority));
  }

  hasAuthorityDirect(authority: string): boolean {
    if (!this.authenticated || !this.userIdentity || !this.userIdentity.roles) {
      return false;
    }
    if (authority === '') {
      return true;
    }
    return this.userIdentity.roles[0].authority === authority;
  }

  getIdentity(): any {
    return this.userIdentity;
  }

  isAuthenticated() {
    return this.authenticated;
  }

  isAdmin(): boolean {
    return this.hasAuthorityDirect('ADMIN');
  }

  isDoctor(): boolean {
    return this.hasAuthorityDirect('DOCTOR');
  }

}
