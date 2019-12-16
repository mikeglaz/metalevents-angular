import { Component, OnInit } from "@angular/core";

import { Event } from "../event.model";
import { EventService } from '../event.service';
import { DataService } from '../../shared/data.service';

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
