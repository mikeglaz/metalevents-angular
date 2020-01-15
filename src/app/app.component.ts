import { Component, OnInit } from "@angular/core";

import { AuthService } from './_services/auth.service';
import { EventService } from './_services/event.service';


@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  title = "metalevents";

  constructor(
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.authService.autoLogin();
  }
}
