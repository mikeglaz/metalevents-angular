import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { catchError, tap } from "rxjs/operators";
import { throwError, BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';

import { User } from '../_models/user.model';


export interface AuthResponse {
  token: string;
  id?: number;
  name?: string;
  message?: string;
  email?: string;
  refreshToken?: string;
  expiresIn?: string;
  localId?: string;
}

@Injectable({ providedIn: "root" })
export class AuthService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

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
    return this.http
      .post<AuthResponse>("http://localhost:3000/login", {
        email,
        password
      })
      .pipe(
        catchError(this.handleError),
        tap(res => {
          const user = new User(res.id, res.name, res.email, res.token);
          this.currentUserSubject.next(user);
          localStorage.setItem('currentUser', JSON.stringify(user));
        })
      );
  }

  autoLogin() {
    const userData: {
      id: number,
      name: string,
      email: string,
      _token: string,
    } = JSON.parse(localStorage.getItem('currentUser'));



    if(!userData){
      return;
    }

    const loadedUser = new User(userData.id, userData.name, userData.email, userData._token);

    this.currentUserSubject.next(loadedUser);
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
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
