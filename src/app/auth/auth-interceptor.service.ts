import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpHeaders
} from "@angular/common/http";

import { AuthService } from "./auth.service";
import { take, exhaustMap } from 'rxjs/operators';
import { HttpParams } from '@angular/common/http';


@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return this.authService.user.pipe(
      take(1),
      exhaustMap(user => {
        if(user){
          const authReq = req.clone({
            headers: new HttpHeaders().set('Authorization', user.token)
          });

          return next.handle(authReq);
        }

        return next.handle(req);
      }))
  }
}
