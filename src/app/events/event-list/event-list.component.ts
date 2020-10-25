import { Component, OnInit, Input } from '@angular/core';

import { Event } from '../../_models/event.model';
import { EventService } from '../../_services/event.service';
import { Venue } from '../../_models/venue.model';
import { Store } from '@ngrx/store';
import * as fromApp from 'src/app/store/app.reducer';

@Component({
  selector: "app-event-list",
  templateUrl: "./event-list.component.html",
  styleUrls: ["./event-list.component.scss"]
})
export class EventListComponent implements OnInit {
  events: Event[];
  @Input() venue: Venue;

  constructor(
    private eventService: EventService,
    private store: Store<fromApp.AppState>) {}

  ngOnInit() {
    this.eventService.eventsChanged.subscribe(
      (events: Event[]) => {
        this.events = events;
      }
    )

    this.events = this.eventService.getEvents();
    // this.store.select('eventList').subscribe(eventList => {
    //   this.events = eventList.events;
    // });
  }
}
