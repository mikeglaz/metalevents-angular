import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../_services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss']
})
export class PasswordResetComponent implements OnInit {
  isLoading = false;
  message: string = null;
  error: string = null;
  passwordResetForm: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router) {}

  ngOnInit() {
    this.passwordResetForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email])
    });
  }

  onSubmit() {
    this.isLoading = true;

    this.authService.passwordReset(this.passwordResetForm.value.email).subscribe(
      (response) => {
        this.message = response.message;
        this.isLoading = false;
        this.passwordResetForm.reset();
        // this.router.navigate(['/events']);
      },
      errorMessage => {
        this.error = errorMessage;
        this.isLoading = false;
      }
    );
  }

}
