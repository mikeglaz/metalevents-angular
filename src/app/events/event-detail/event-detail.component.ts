import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";

import { EventService } from '../../_services/event.service';
import { Event } from '../../_models/event.model';


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
