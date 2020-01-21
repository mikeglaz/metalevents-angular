import { Component, OnInit, OnDestroy } from '@angular/core';

import { AuthService } from '../../_services/auth.service';
import { User } from '../../_models/user.model';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-profile-detail',
  templateUrl: './profile-detail.component.html',
  styleUrls: ['./profile-detail.component.scss']
})
export class ProfileDetailComponent implements OnInit, OnDestroy {
  user: User;
  message: string = null;
  messageSubscription: Subscription;

  constructor(
    private authService: AuthService) {}

  ngOnInit() {
    this.authService.getCurrentUser().subscribe(currentUser => {
      this.user = currentUser;
    });

    this.messageSubscription = this.authService.getMessage().subscribe(message => {
      console.log(message);
      this.message = message;
    });

  }

  ngOnDestroy() {
    this.authService.setMessage(null);
    this.messageSubscription.unsubscribe();
  }

}
