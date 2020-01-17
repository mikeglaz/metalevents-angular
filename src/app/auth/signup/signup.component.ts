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
      password: new FormControl(null, Validators.required)
    });

    this.signupForm.addControl(
      "confirmedPassword",
      new FormControl(null, [
        Validators.compose([Validators.required, this.passwordsMatch])
      ])
    );
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

  private passwordsMatch = (control: FormControl): ValidationErrors | null => {
    return control.value === this.signupForm.get("password").value ? null : {
      passwordError: true
    };
  };

}
