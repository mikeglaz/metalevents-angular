import { Component, OnInit } from "@angular/core";

import { DataService } from './_services/data.service';
import { AuthService } from './_services/auth.service';


@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  title = "metalevents";

  constructor(
    private dataService: DataService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.authService.autoLogin();
    this.dataService.fetchEvents().subscribe();
  }
}
