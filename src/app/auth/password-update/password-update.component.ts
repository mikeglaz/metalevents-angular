import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  Validators,
  FormControl,
  ValidationErrors,
  ValidatorFn
} from "@angular/forms";
import { Router, ActivatedRoute, Params } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

import { AuthService } from "../../_services/auth.service";


@Component({
  selector: "app-password-update",
  templateUrl: "./password-update.component.html",
  styleUrls: ["./password-update.component.scss"]
})
export class PasswordUpdateComponent implements OnInit {
  isLoading = false;
  error: string = null;
  message: string = null;
  token: string = null;
  formError: string = null;
  passwordUpdateForm: FormGroup;
  userEmail: string = null;
  private jwtHelper: JwtHelperService;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router) {

    this.jwtHelper = new JwtHelperService();
  }

  ngOnInit() {
    this.route.params
      .subscribe((params: Params) => {
        this.token = params.token;

        if(this.token) {
          const decodedToken: { email: string, exp: number } = this.jwtHelper.decodeToken(this.token);

          this.userEmail = decodedToken.email;

        }
      });

    this.passwordUpdateForm = new FormGroup(
      {
        password: new FormControl(null, Validators.required),
        confirmedPassword: new FormControl(null, Validators.required)
      },
      { validators: this.passwordMatchValidator }
    );
  }

  onSubmit() {
    this.isLoading = true;

    const password = this.passwordUpdateForm.value.password;
    const confirmedPassword = this.passwordUpdateForm.value.confirmedPassword;

    if(password === confirmedPassword) {
      this.authService.passwordUpdate(this.token, password).subscribe(
        (response) => {
          this.authService.setMessage(response.message);
          this.isLoading = false;
          this.passwordUpdateForm.reset();
          this.router.navigate(['/auth/login']);
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
