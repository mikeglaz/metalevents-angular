import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ValidationErrors
} from "@angular/forms";
import { Observable } from 'rxjs';
import { ActivatedRoute, Params } from '@angular/router';

import { AuthService, AuthResponse } from '../../_services/auth.service';
import { ValidatorFn } from '@angular/forms';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  isLoading = false;
  error: string = null;
  message: string = null;
  signupForm: FormGroup;

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute) {}

  ngOnInit() {
    this.signupForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
      confirmedPassword: new FormControl(null, Validators.required)
    }, { validators: this.passwordMatchValidator });
  }

  onSubmit() {
    const name = this.signupForm.value.name;
    const email = this.signupForm.value.email;
    const password = this.signupForm.value.password;

    this.isLoading = true;

    this.authService.signup(name, email, password).subscribe(
      (response: AuthResponse) => {
        this.message = this.error = null;
        this.message = response.message;
        this.isLoading = false;
      },
      errorMessage => {
        this.message = this.error = null;
        this.error = errorMessage;
        this.isLoading = false;
      }
    );

    this.signupForm.reset();
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
