import { Component, OnInit } from '@angular/core';

import { User } from '../../_models/user.model';
import { UserService } from '../../_services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  users: User[];

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.usersChanged.subscribe((users: User[]) => {
      this.users = users;
    });

    this.users = this.userService.getUsers();
  }

}
