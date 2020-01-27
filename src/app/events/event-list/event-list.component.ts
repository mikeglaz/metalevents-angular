import { Component, OnInit, Input } from '@angular/core';

import { Event } from '../../_models/event.model';
import { EventService } from '../../_services/event.service';
import { Venue } from '../../_models/venue.model';


@Component({
  selector: "app-event-list",
  templateUrl: "./event-list.component.html",
  styleUrls: ["./event-list.component.scss"]
})
export class EventListComponent implements OnInit {
  events: Event[];
  @Input() venue: Venue;

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

