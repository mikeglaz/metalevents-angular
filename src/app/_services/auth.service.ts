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
  // currentUser: BehaviorSubject<User>;
  // public currentUser: Observable<User>;

  private token: string = null;
  // private isAuthenticated: boolean = false;
  private authStatusListener = new BehaviorSubject<boolean>(null);
  private tokenTimer: any;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    // this.currentUser = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
  }

  getToken() {
    return this.token;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
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
    this.http.post<{token: string}>("http://localhost:3000/login", {
      email,
      password
    }).subscribe(response => {
      this.token = response.token;

      if(this.token) {
        const jwtHelper = new JwtHelperService();
        const decodedToken = jwtHelper.decodeToken(this.token);


        this.setAuthTimer(decodedToken.expiresIn);

        // jwtHelper.isTokenExpired(this.token);

        // this.isAuthenticated = true;
        this.authStatusListener.next(true);
        const now = new Date();
        const expirationDate = new Date(now.getTime() + decodedToken.expiresIn * 1000);
        this.saveAuthData(this.token, expirationDate);
        this.router.navigate(['/events']);
      }
    })

    return this.http
      .post<{token: string}>("http://localhost:3000/login", {
        email,
        password
      })
      .pipe(
        catchError(this.handleError),
        tap(response => {
          this.token = response.token;
          this.authStatusListener.next(true);
          // const helper = new JwtHelperService();
          // const decodedToken = helper.decodeToken(res.token);
          // const user = new User(res.id, res.name, res.email, decodedToken.admin, res.token);

          // console.log(res);
          // console.log(decodedToken);

          // this.currentUser.next(user);
          // localStorage.setItem('currentUser', JSON.stringify(user));
        })
      );
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
    localStorage.setItem('expirationDate', expirationDate.toISOString());
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

  private setAuthTimer(duration: number) {
    console.log("Setting timer: " + duration);
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
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
      // this.isAuthenticated = true;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
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
    this.authStatusListener.next(false);
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
