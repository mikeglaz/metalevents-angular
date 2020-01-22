import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { UserService } from '../_services/user.service';
import { User } from '../_models/user.model';


@Injectable({ providedIn: 'root' })
export class UserResolverService implements Resolve<User[]> {
  constructor(private userService: UserService){}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    const users = this.userService.getUsers();

    if(users.length === 0){
      return this.userService.fetchUsers();
    } else {
      return users;
    }
  }
}
