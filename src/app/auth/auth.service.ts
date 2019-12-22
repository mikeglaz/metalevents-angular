import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { catchError, tap } from "rxjs/operators";
import { throwError, BehaviorSubject } from 'rxjs';

import { User } from "./user.model";
import { DataService } from '../shared/data.service';

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
  user = new BehaviorSubject<User>(null);

  constructor(
    private http: HttpClient,
    // private dataService: DataService
  ) {}

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
          this.user.next(user);
        })
      );
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
