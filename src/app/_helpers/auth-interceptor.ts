import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpHeaders
} from "@angular/common/http";

import { take, exhaustMap } from 'rxjs/operators';
import { HttpParams, HttpEvent } from '@angular/common/http';
import { AuthService } from '../_services/auth.service';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authToken = this.authService.getToken();

    if(authToken) {
      request = request.clone({
        headers: request.headers.set('Authorization', authToken)
      });
    }

    return next.handle(request);



    // return this.authService.currentUser.pipe(
    //   take(1),
    //   exhaustMap(currentUser => {
    //     if(currentUser){
    //       const authReq = req.clone({
    //         headers: new HttpHeaders().set('Authorization', currentUser.token)
    //       });

    //       return next.handle(authReq);
    //     }

    //     return next.handle(req);


    //   }))

    // const currentUser = this.authService.currentUserValue;

    // if(currentUser && currentUser.token) {
    //   req = req.clone({
    //     // headers: new HttpHeaders().set('Authorization', currentUser.token)
    //     setHeaders: {
    //       Authorization: currentUser.token
    //     }
    //   });
    // }

    // return next.handle(req);
  }
}
