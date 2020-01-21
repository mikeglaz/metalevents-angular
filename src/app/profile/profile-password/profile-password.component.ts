import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../_services/auth.service';
import { User } from '../../_models/user.model';
import { FormGroup, FormControl, Validators, ValidatorFn, ValidationErrors } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-profile-password',
  templateUrl: './profile-password.component.html',
  styleUrls: ['./profile-password.component.scss']
})
export class ProfilePasswordComponent implements OnInit {
  user: User;
  isLoading = false;
  error: string = null;
  message: string = null;


  changePasswordForm: FormGroup;
  private token: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService) { }

  ngOnInit() {
    this.authService.getCurrentUser().subscribe(user => {
      this.user = user;
    });

    this.token = this.authService.getToken();

    this.changePasswordForm = new FormGroup({
      password: new FormControl(null, Validators.required),
      confirmedPassword: new FormControl(null, Validators.required)
    }, { validators: this.passwordMatchValidator });
  }

  onSubmit() {
    this.isLoading = true;

    const password = this.changePasswordForm.value.password;
    const confirmedPassword = this.changePasswordForm.value.confirmedPassword;

    if(password === confirmedPassword) {
      this.authService.passwordUpdate(this.token, password).subscribe(
        (response) => {
          this.authService.setMessage(response.message);
          this.isLoading = false;
          this.onCancel();
        },
        errorMessage => {
          this.error = errorMessage;
          this.isLoading = false;
        }
      );
    } else {
      this.error = 'Passwords do not match'
    }
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  private passwordMatchValidator: ValidatorFn = (
    control: FormControl
  ): ValidationErrors | null => {
    const password = control.get('password');
    const confirmedPassword = control.get('confirmedPassword');

    if(password && confirmedPassword && password.value === confirmedPassword.value) {
      return null;
    }

    return {
      passwordMismatch: true
    };
  };
}
