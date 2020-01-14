import { Role } from "./role";
import { JwtHelperService } from '@auth0/angular-jwt';

export class User {
  constructor(
    public id: number,
    public name: string,
    public email: string,
    public admin: boolean,
    public exp?: number
    // public jwtHelper: JwtHelperService,
    // private _token?: string,
  ) {}

  // get token() {
  //   if(this.jwtHelper.isTokenExpired()) {
  //     return null;
  //   }

  //   return this._token;
  // }
}
