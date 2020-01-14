import { Component, OnInit } from "@angular/core";

import { Event } from '../../_models/event.model';
import { EventService } from '../../_services/event.service';
import { DataService } from '../../_services/data.service';


@Component({
  selector: "app-event-list",
  templateUrl: "./event-list.component.html",
  styleUrls: ["./event-list.component.scss"]
})
export class EventListComponent implements OnInit {
  events: Event[];

  constructor(
    private eventService: EventService,
    private dataService: DataService) {}

  ngOnInit() {
    this.eventService.eventsChanged.subscribe(
      (events: Event[]) => {
        this.events = events;
      }
    )

    this.events = this.eventService.getEvents();
  }
}
