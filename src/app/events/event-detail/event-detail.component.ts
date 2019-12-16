import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";

import { Event } from "../event.model";
import { EventService } from "../event.service";

@Component({
  selector: "app-event-detail",
  templateUrl: "./event-detail.component.html",
  styleUrls: ["./event-detail.component.scss"]
})
export class EventDetailComponent implements OnInit {
  event: Event;
  id: number;

  constructor(
    private eventService: EventService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params.id;
      this.event = this.eventService.getEvent(this.id);
    });
  }

  onDeleteEvent() {
    if (confirm("Are you sure?")) {
      this.eventService.deleteEvent(this.id);
      this.router.navigate(["/events"]);
    }
  }
}
