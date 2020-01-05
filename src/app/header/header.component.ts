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
  private userSubscription: Subscription;
  user: User;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.userSubscription = this.authService.currentUser.subscribe(user => {
      // console.log(user);
      this.user = user;
    });
  }

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }
}
