import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../../_services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-password-update',
  templateUrl: './password-update.component.html',
  styleUrls: ['./password-update.component.scss']
})
export class PasswordUpdateComponent implements OnInit {
  isLoading = false;
  error: string = null;
  passwordUpdateForm: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router) {}

  ngOnInit() {
    this.passwordUpdateForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email])
    });
  }

  onSubmit() {
    this.isLoading = true;

    const email = this.passwordUpdateForm.value.email;
    const password = this.passwordUpdateForm.value.password;

    this.authService.passwordUpdate(email, password).subscribe(
      (response) => {
        this.isLoading = false;
        // this.passwordUpdateForm.reset();
        // this.router.navigate(['/auth/login']);
      },
      errorMessage => {
        this.error = errorMessage;
        this.isLoading = false;
      }
    );
  }

}
