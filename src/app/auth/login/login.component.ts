import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators
} from "@angular/forms";

import { Router } from '@angular/router';

import { AuthService } from '../../_services/auth.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  isLoading = false;
  error: string = null;
  message: string = null;
  messageSubscription: Subscription;
  loginForm: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router) {}

  ngOnInit() {
    this.messageSubscription = this.authService.getMessage().subscribe(message => {
      this.message = message;
    });

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

  ngOnDestroy() {
    this.authService.setMessage(null);
    this.messageSubscription.unsubscribe();
  }

}
