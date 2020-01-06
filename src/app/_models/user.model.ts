import { Role } from "./role";

export class User {
  constructor(
    public id: number,
    public name: string,
    public email: string,
    public role: Role,
    private _token?: string
  ) {}

  get token() {
    return this._token;
  }
}
