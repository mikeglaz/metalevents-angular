export class User {
  constructor(
    public id: number,
    public name: string,
    public email: string,
    private _token: string,
    // private _tokenExpirationDate: Date
  ) {}

  get token() {
    // if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
    //   // token expired
    //   return null;
    // }

    return this._token;
  }
}
