import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

export interface AuthResponse {
  auth_token: string;
  message?: string;
  email?: string;
  refreshToken?: string;
  expiresIn?: string;
  localId?: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) {}

  signup(name: string, email: string, password: string) {
    return this.http.post<AuthResponse>('http://localhost:3000/signup',
    {
      name,
      email,
      password
    })
    .pipe(catchError(errorResponse => {
      let errorMessage = 'An unknown error occurred.';

      if(!errorResponse.error) {
        return throwError(errorMessage);
      }

      switch(errorResponse.error) {
        case 'EMAIL_EXISTS':
          errorMessage = 'This email already exists.';
      }

      return throwError(errorMessage);
    }));

  }

  login(email: string, password: string) {
    return this.http.post<AuthResponse>('http://localhost:3000/auth/login',
    {
      name,
      email
    });
  }
}
