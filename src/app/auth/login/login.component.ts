import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators
} from "@angular/forms";

import { Router } from '@angular/router';

import { AuthService } from '../../_services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  isLoading = false;
  error: string = null;
  loginForm: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router) {}

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required)
    });
  }

  onSubmit() {
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;

    this.isLoading = true;

    this.authService.login(email, password).subscribe(
      (response) => {
        this.isLoading = false;
        this.router.navigate(['/events']);
      },
      errorMessage => {
        this.error = errorMessage;
        this.isLoading = false;
      }
    );

    this.loginForm.reset();
  }

}
