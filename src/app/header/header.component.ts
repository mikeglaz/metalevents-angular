import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { User } from '../_models/user.model';
import { AuthService } from '../_services/auth.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  collapsed = true;
  private authStatusSubscription: Subscription;

  loggedInUser = false;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    // this.userSubscription = this.authService.currentUser.subscribe(currentUser => {
    //   // console.log(user);
    //   this.loggedInUser = currentUser;
    // });

    this.authStatusSubscription = this.authService.getAuthStatusListener().subscribe(isAuthenticated => {
      this.loggedInUser = isAuthenticated;
    });
  }

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    this.authStatusSubscription.unsubscribe();
  }
}
