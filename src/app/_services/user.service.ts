import { Injectable } from "@angular/core";
import { Subject, Observable } from 'rxjs';
import { HttpClient } from "@angular/common/http";

import { User } from "../_models/user.model";
import { AuthService } from "./auth.service";
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: "root"
})
export class UserService {
  usersChanged = new Subject<User[]>();

  private users: User[] = [];

  constructor(private http: HttpClient, private authService: AuthService) {}

  setUsers(users: User[]) {
    this.users = users;
    this.usersChanged.next(this.users.slice());
  }

  getUsers(): User[] {
    return this.users.slice();
  }

  getUser(id: number): User {
    return this.users.find(user => user.id === id);
  }

  // newUser(user: User) {
  //   this.saveEvent(User).subscribe(savedEvent => {
  //     this.User.push(savedEvent);
  //     this.UserChanged.next(this.User.slice());
  //   });
  // }

  updateUser(id: number, user: User) {
    let userIndex = this.users.findIndex(user => user.id === id);

    this.users[userIndex] = { ...user, id: id };
    this.usersChanged.next(this.users.slice());

    this.http.put(`http://localhost:3000/users/${id}`, { user: user })
      .subscribe();
  }

  deleteUser(user: User) {
    let userIndex = this.users.indexOf(user);

    this.http.delete(`http://localhost:3000/users/${user.id}`).subscribe(() => {
      this.users.splice(userIndex, 1);
      this.usersChanged.next(this.users.slice());
    });
  }

  // saveEvent(User: User): Observable<User> {
  //   return this.http
  //     .post<User>("http://localhost:3000/User", { User: User });
  // }

  // reloading eveints/:id does not work - with the subscription here

  // fetchUser(): void {
  //   this.http.get<User[]>("http://localhost:3000/User").subscribe(User => {
  //     this.setUser(User);
  //   });
  // }

  fetchUsers(): Observable<User[]> {
    return this.http.get<User[]>("http://localhost:3000/users").pipe(
      tap(users => {
        this.setUsers(users);
      })
    );
  }
}
