import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormControl,
  Validators,
  ValidationErrors
} from "@angular/forms";

import { AuthService, AuthResponse } from "./auth.service";
import { Observable } from 'rxjs';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: "app-auth",
  templateUrl: "./auth.component.html",
  styleUrls: ["./auth.component.scss"]
})
export class AuthComponent implements OnInit {
  signupMode = true;
  isLoading = false;
  error: string = null;
  authForm: FormGroup;

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params
      .subscribe((params: Params) => {
        if(params.type === 'signup'){
          this.signupMode = true;
        } else if (params.type === 'login') {
          this.signupMode = false;
        }
      });

    this.authForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required)
    });

    this.authForm.addControl(
      "confirmedPassword",
      new FormControl(null, [
        Validators.compose([Validators.required, this.passwordConfirmation])
      ])
    );
  }

  onSubmit() {
    const name = this.authForm.value.name;
    const email = this.authForm.value.email;
    const password = this.authForm.value.password;

    this.isLoading = true;

    let authObservable: Observable<AuthResponse>

    if (this.signupMode) {
      authObservable = this.authService.signup(name, email, password);
    } else {
      authObservable = this.authService.login(email, password);
    }

    authObservable.subscribe(
      (response: AuthResponse) => {
        console.log(response);
        this.isLoading = false;
      },
      errorMessage => {
        this.error = errorMessage;
        this.isLoading = false;
      }
    );

    this.authForm.reset();
  }

  passwordConfirmation = (control: FormControl): ValidationErrors | null => {
    return control.value === this.authForm.get("password").value
      ? null
      : {
          passwordError: true
        };
  };
}
