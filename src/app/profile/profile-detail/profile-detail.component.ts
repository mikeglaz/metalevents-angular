import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../_services/auth.service';
import { User } from '../../_models/user.model';


@Component({
  selector: 'app-profile-detail',
  templateUrl: './profile-detail.component.html',
  styleUrls: ['./profile-detail.component.scss']
})
export class ProfileDetailComponent implements OnInit {
  user: User;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.getCurrentUser().subscribe(currentUser => {
      this.user = currentUser;
    });
  }

}
