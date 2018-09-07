import {Injectable} from '@angular/core';

@Injectable()
export class JWTUtilsService {

  constructor() {
  }

  getDecodedData(token: string) {
    const jwtData = token.split('.')[1];
    const decodedJwtJsonData = window.atob(jwtData);
    return JSON.parse(decodedJwtJsonData);
  }


}
