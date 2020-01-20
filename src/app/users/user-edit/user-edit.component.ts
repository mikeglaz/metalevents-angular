import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { UserService } from '../../_services/user.service';
import { User } from '../../_models/user.model';


@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {
  isLoading: boolean = false;
  error: string = null;
  message: string = null;
  user: User;
  userForm: FormGroup;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    ) {}

  ngOnInit() {
    this.route.params
      .subscribe((params: Params) => {
        this.user = this.userService.getUser(+params.id);
        this.initForm();
      });
  }

  onSubmit() {
    // this.isLoading = true;
    this.userService.updateUser(this.user.id, this.userForm.value)
      // .subscribe(user => {
      // let userIndex = this.users.findIndex(user => user.id === id);

      // this.users[userIndex] = { ...user, id: id };
      // this.usersChanged.next(this.users.slice());
      // });

    this.onCancel();
    // .subscribe(
    //   (response: AuthResponse) => {
    //     this.message = this.error = null;
    //     this.message = response.message;
    //     this.isLoading = false;
    //   },
    //   errorMessage => {
    //     this.message = this.error = null;
    //     this.error = errorMessage;
    //     this.isLoading = false;
    //   }
    // );
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  private initForm() {
    const name = this.user.name;
    const email = this.user.email;

    this.userForm = new FormGroup({
      name: new FormControl(name, Validators.required),
      email: new FormControl(email, [Validators.required, Validators.email])
    });
  }

}
