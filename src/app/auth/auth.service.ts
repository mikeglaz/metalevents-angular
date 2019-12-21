import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';

import { User } from './user.model';

export interface AuthResponse {
  auth_token: string;
  id?: number;
  name?: string;
  message?: string;
  email?: string;
  refreshToken?: string;
  expiresIn?: string;
  localId?: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  user = new BehaviorSubject<User>(null);

  constructor(private http: HttpClient) {}

  signup(name: string, email: string, password: string) {
    return this.http.post<AuthResponse>('http://localhost:3000/signup',
    {
      name,
      email,
      password
    })
    .pipe(
        catchError(this.handleError),
        tap((response) => {
          console.log(response);
          // const user = new User(response.id, response.name, response.email, response.auth_token,);
        })
    );
  }

  login(email: string, password: string) {
    return this.http.post<AuthResponse>('http://localhost:3000/login',
    {
      email,
      password
    })
    .pipe(catchError(this.handleError));
  }

private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred.';

    if(!errorRes.error) {
      return throwError(errorMessage);
    }

    switch(errorRes.error) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email already exists.';
        break;
      case 'INVALID_CREDENTIALS':
        errorMessage = 'Invalid email and/or password.';
        break;
    }

    return throwError(errorMessage);
  }
}
