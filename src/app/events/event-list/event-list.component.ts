import { Component, OnInit } from "@angular/core";

import { Event } from '../../_models/event.model';
import { EventService } from '../../_services/event.service';


@Component({
  selector: "app-event-list",
  templateUrl: "./event-list.component.html",
  styleUrls: ["./event-list.component.scss"]
})
export class EventListComponent implements OnInit {
  events: Event[];

  constructor(private eventService: EventService) {}

  ngOnInit() {
    this.eventService.eventsChanged.subscribe(
      (events: Event[]) => {
        this.events = events;
      }
    )

    this.events = this.eventService.getEvents();
  }
}
