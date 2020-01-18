import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  Validators,
  FormControl,
  ValidationErrors,
  ValidatorFn
} from "@angular/forms";
import { AuthService } from "../../_services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-password-update",
  templateUrl: "./password-update.component.html",
  styleUrls: ["./password-update.component.scss"]
})
export class PasswordUpdateComponent implements OnInit {
  isLoading = false;
  error: string = null;
  formError: string = null;
  passwordUpdateForm: FormGroup;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
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
      // this.authService.passwordUpdate(email, password).subscribe(
      //   (response) => {
      //     this.isLoading = false;
      //     // this.passwordUpdateForm.reset();
      //     // this.router.navigate(['/auth/login']);
      //   },
      //   errorMessage => {
      //     this.error = errorMessage;
      //     this.isLoading = false;
      //   }
      // );
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
