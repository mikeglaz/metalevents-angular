import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { catchError, tap } from "rxjs/operators";
import { throwError, BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

import { User } from '../_models/user.model';


export interface AuthResponse {
  id: number;
  name: string;
  email: string;
  token: string;
  message: string;
}


@Injectable({ providedIn: "root" })
export class AuthService {
  private currentUserListener: BehaviorSubject<User>;
  private messageListener: BehaviorSubject<string>;
  private jwtHelper: JwtHelperService;

  // public currentUser: Observable<User>;

  private token: string = null;
  // private isAuthenticated: boolean = false;
  // private authStatusListener = new BehaviorSubject<boolean>(null);
  private tokenTimer: any;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.currentUserListener = new BehaviorSubject<User>(null);
    this.messageListener = new BehaviorSubject<string>(null);
    // this.currentUserListener = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));

    this.jwtHelper = new JwtHelperService();
  }

  getToken() {
    return this.token;
  }

  // getIsAuthenticated() {
  //   return this.isAuthenticated;
  // }

  // public get currentUserValue(): User {
  //   return this.currentUser.value;
  // }

  signup(name: string, email: string, password: string) {
    return this.http
      .post<AuthResponse>("http://localhost:3000/signup", {
        name,
        email,
        password
      })
      .pipe(catchError(this.handleError));
  }

  login(email: string, password: string) {
    return this.http.post<{token: string}>("http://localhost:3000/login", {
      email: email,
      password: password
    }).pipe(tap(response => {
      this.token = response.token;

      if(this.token) {
        const decodedToken: User = this.jwtHelper.decodeToken(this.token);

        const now = new Date();
        const expirationDate = new Date(decodedToken.exp * 1000);
        const duration = expirationDate.getTime() - now.getTime();

        this.setAuthTimer(duration);

        this.saveAuthData(this.token, expirationDate);
        this.setCurrentUser();

        this.router.navigate(['/events']);
      }
    }));
  }

  passwordReset(email: string) {
    return this.http.post<{message: string}>("http://localhost:3000/password_reset", { email: email });
  }

  passwordUpdate(token: string, password: string) {
    return this.http.put<{message: string}>("http://localhost:3000/password_reset", { token: token, password: password });
  }

  // isLoggedIn() {
  //   const jwtHelper = new JwtHelperService();
  //   const token = localStorage.getItem('token');

  //   const decodedToken = jwtHelper.decodeToken(token);
  //   // const expirationDate = helper.getTokenExpirationDate(myRawToken);
  //   return !jwtHelper.isTokenExpired(token);

  // }

  private saveAuthData(token: string, expirationDate: Date) {
    localStorage.setItem('token', token);
    localStorage.setItem('expirationDate', expirationDate.toUTCString());
  }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
  }

  private getAuthData() {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expirationDate');

    if(!token || !expirationDate) {
      return;
    }

    return {
      token: token,
      expirationDate: new Date(expirationDate)
    }
  }

  private setCurrentUser() {
    if(this.token){
      const userData: User = this.jwtHelper.decodeToken(this.token);
      const user = new User(userData.id, userData.name, userData.email, userData.admin);
      this.currentUserListener.next(user);
    }
  }

  setMessage(message: string) {
    this.messageListener.next(message);
  }

  getMessage() {
    return this.messageListener;
  }

  getCurrentUser() {
    return this.currentUserListener.asObservable();
    // return this.currentUserListener.value;
  }

  private setAuthTimer(duration: number) {
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration);
  }

  autoLogin() {
    // const userData: {
    //   id: number,
    //   name: string,
    //   email: string,
    //   admin: boolean,
    //   _token: string
    // } = JSON.parse(localStorage.getItem('currentUser'));
    const authData = this.getAuthData();

    if(!authData) {
      return;
    }

    const now = new Date();
    const expiresIn = authData.expirationDate.getTime() - now.getTime();

    if(expiresIn > 0) {
      this.token = authData.token;

      this.setAuthTimer(expiresIn);
      this.setCurrentUser();
    }


    // const loadedUser = new User(userData.id, userData.name, userData.email, userData.admin, userData._token);

    // this.currentUser.next(loadedUser);
  }

  logout() {
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    // localStorage.removeItem('currentUser');
    // this.currentUser.next(null);
    this.token = null;
    // this.isAuthenticated = false;
    this.currentUserListener.next(null);
    this.router.navigate(['/auth/login']);
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = "An unknown error occurred.";

    if (!errorRes.error) {
      return throwError(errorMessage);
    }

    errorMessage = errorRes.error.message;

    return throwError(errorMessage);
  }
}
