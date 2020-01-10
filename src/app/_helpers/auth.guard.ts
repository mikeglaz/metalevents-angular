import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from "@angular/router";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

import { AuthService } from "../_services/auth.service";

@Injectable({ providedIn: "root" })
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    router: RouterStateSnapshot
  ): boolean | Promise<boolean> | Observable<boolean> {
    // const currentUser = this.authService.currentUser.value;

    // if(route.data.admin && currentUser.admin){
    //   return true;
    // }

    return this.authService.getAuthStatusListener();

    // .subscribe(isAuthenticated => {
    //   // isAuthenticated;
    //   return false;
    // })


  }
}
