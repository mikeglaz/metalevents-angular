import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl, ValidationErrors } from '@angular/forms';
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
  formError: string = null;
  passwordUpdateForm: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router) {}

  ngOnInit() {
    this.passwordUpdateForm = new FormGroup({
      password: new FormControl(null, [Validators.required, Validators.email])
    });

    this.passwordUpdateForm.addControl(
      "confirmedPassword",
      new FormControl(null, [
        Validators.compose([Validators.required, this.passwordsMatch])
      ])
    );
  }

  onSubmit() {
    console.log(this.passwordUpdateForm);
    // this.isLoading = true;

    const email = this.passwordUpdateForm.value.email;
    const password = this.passwordUpdateForm.value.password;

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
  }

  private passwordsMatch = (control: FormControl): ValidationErrors | null => {
    // this.formError =
    if(control.value === this.passwordUpdateForm.get("password").value) {
      return null;
    }

    return {
      passwordError: true
    };

    // return control.value === this.passwordUpdateForm.get("password").value ? null : {
    //   passwordError: true
    // };
  };

}
