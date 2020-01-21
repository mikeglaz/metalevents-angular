import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';

import { User } from '../../_models/user.model';
import { UserService } from '../../_services/user.service';
import { AuthService } from '../../_services/auth.service';
import { Subject, Subscription } from 'rxjs';


@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit, OnDestroy {
  user: User;
  userSubscription: Subscription;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.user = this.userService.getUser(+params.id);
      this.userService.userChanged.next(this.user);
    });

    this.userSubscription = this.userService.userChanged.subscribe(user => {
      this.user = user;
    });
  }


  onDeleteUser() {
    if(confirm("Are you sure?")) {
      this.userService.deleteUser(this.user);
      this.router.navigate(["/users"]);
    }
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }
}
