import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { catchError, tap } from "rxjs/operators";
import { throwError, BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';

import { User } from '../_models/user.model';
import { Role } from '../_models/role';


export interface AuthResponse {
  token: string;
  role?: Role
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
  currentUser: BehaviorSubject<User>;
  // public currentUser: Observable<User>;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.currentUser = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
  }

  public get currentUserValue(): User {
    return this.currentUser.value;
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
          const user = new User(res.id, res.name, res.email, res.role, res.token);
          this.currentUser.next(user);
          localStorage.setItem('currentUser', JSON.stringify(user));
        })
      );
  }

  autoLogin() {
    const userData: {
      id: number,
      name: string,
      email: string,
      role: Role,
      _token: string,
    } = JSON.parse(localStorage.getItem('currentUser'));



    if(!userData){
      return;
    }

    const loadedUser = new User(userData.id, userData.name, userData.email, userData.role, userData._token);

    this.currentUser.next(loadedUser);
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUser.next(null);
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
