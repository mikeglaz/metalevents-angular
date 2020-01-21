import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { User } from '../../_models/user.model';
import { AuthService } from '../../_services/auth.service';
import { UserService } from '../../_services/user.service';


@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.scss']
})
export class ProfileEditComponent implements OnInit {
  user: User;
  profileForm: FormGroup;
  isLoading = false;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService) {}

  ngOnInit() {
    this.authService.getCurrentUser().subscribe(currentUser => {
      this.user = currentUser;
    });

    this.profileForm = new FormGroup({
      name: new FormControl(this.user.name, Validators.required),
      email: new FormControl(this.user.email, [Validators.required, Validators.email])
    });
  }

  onSubmit() {
    // this.isLoading = true;

    this.userService.updateUser(this.user.id, this.profileForm.value).subscribe(user => {
      // this.authService.setCurrentUser()
      this.authService.getCurrentUser().next(user);
    });

    this.onCancel();
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
