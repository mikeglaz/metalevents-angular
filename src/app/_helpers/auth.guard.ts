import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AuthService } from '../_services/auth.service';


@Injectable({ providedIn: 'root'})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService){}

  canActivate(route: ActivatedRouteSnapshot, router: RouterStateSnapshot): boolean | Promise<boolean> | Observable<boolean>
    {
      const currentUser = this.authService.currentUserValue;

      if(route.data.roles && route.data.roles.indexOf(currentUser.role) > -1) {
        return true;
      }

      return false;

      // return this.authService.currentUser.pipe(map(user => {
      //   return !!user;
      // }));
  }
}
