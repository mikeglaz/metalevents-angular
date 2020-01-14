import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";

import { EventService } from '../../_services/event.service';
import { Event } from '../../_models/event.model';
import { AuthService } from '../../_services/auth.service';
import { User } from '../../_models/user.model';


@Component({
  selector: "app-event-detail",
  templateUrl: "./event-detail.component.html",
  styleUrls: ["./event-detail.component.scss"]
})
export class EventDetailComponent implements OnInit {
  event: Event;
  currentUser: User;

  constructor(
    private eventService: EventService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.event = this.eventService.getEvent(+params.id);
    });

    this.authService.getCurrentUser().subscribe(user => {
      this.currentUser = user;
    });
  }

  authorized() {
    if(this.currentUser){
      if(this.currentUser.admin){
        return true;
      }

      return this.currentUser.id === this.event.user_id
    }

    return false;
  }

  onDeleteEvent() {
    if (confirm("Are you sure?")) {
      this.eventService.deleteEvent(this.event);
      this.router.navigate(["/events"]);
    }
  }
}
