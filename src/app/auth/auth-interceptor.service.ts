import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpHeaders
} from "@angular/common/http";

import { AuthService } from "./auth.service";
import { take, exhaustMap } from 'rxjs/operators';


@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return this.authService.user.pipe(
      take(1),
      exhaustMap(user => {
        // const modifiedReq = req.clone({ headers: new HttpHeaders().set('Authorization', user.token)});



        // const authReq = req.clone({ setHeaders: { Authorization: user.token }});


        // return next.handle(authReq);
        return next.handle(req);
      }))
  }
}
