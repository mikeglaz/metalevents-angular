import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  signupMode = true;
  authForm: FormGroup;

  ngOnInit() {

    this.authForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required)
    });

    this.authForm.addControl('confirmedPassword', new FormControl(null,
      [Validators.compose([
        Validators.required,
        this.passwordConfirmation
      ])]
    ))
  }

  onSubmit() {
    console.log(this.authForm.value);
    this.authForm.reset();
  }

  passwordConfirmation = (control: FormControl): ValidationErrors | null => {
    return control.value === this.authForm.get("password").value ? null : {
        passwordError: true
    };
  }
}
