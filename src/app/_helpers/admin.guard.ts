import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  UrlTree
} from "@angular/router";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map, take } from 'rxjs/operators';

import { AuthService } from "../_services/auth.service";

@Injectable({ providedIn: "root" })
export class AdminGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    router: RouterStateSnapshot
  ): boolean | UrlTree | Promise<boolean | UrlTree> | Observable<boolean | UrlTree> {
    // this.route.params.subscribe((params: Params) => {
    //   console.log(params);
    // });

    return this.authService.getCurrentUser().pipe(
      take(1),
      map(currentUser => {
        if(currentUser){
          if(currentUser.admin){
            return true;
          }

          return this.router.createUrlTree(["/venues"]);
        }


        return this.router.createUrlTree(["/auth/login"]);
      })
    );

    // if(route.data.admin && currentUser.admin){
    //   return true;
    // }
  }
}
