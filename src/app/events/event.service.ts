import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Event } from './event.model';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  eventsChanged = new Subject<Event[]>();

  private events: Event[] = [
    new Event(
      "Abigor",
      "Nachthymnen Tour",
      new Date(2019, 12, 29, 19, 0, 0),
      "Reggies Rock House"
    ),
    new Event(
      "Ghost",
      "A Pale Tour Named Death",
      new Date(2020, 1, 1, 19, 0, 0),
      "Double Door"
    ),
    new Event(
      "Metallica",
      "World Tour 2020",
      new Date(2020, 1, 31, 20, 0, 0),
      "Vic Theatre"
    ),
    new Event(
      "Arcturus",
      "Church Burning Tour 2020",
      new Date(2020, 2, 1, 20, 0, 0),
      "Cobra Lounge"
    ),
    new Event(
      "Opeth",
      "Blackwater Park Tour",
      new Date(2020, 2, 5, 21, 0, 0),
      "Oak Theatre"
    ),
    new Event(
      "Animals As Leaders",
      "Tempting Death Tour",
      new Date(2020, 3, 3, 19, 0, 0),
      "Aragon Ballroom"
    )
  ];

  getEvents(): Event[] {
    return this.events.slice();
  }

  getEvent(id: number): Event {
    return this.events[id];
  }

  newEvent(event: Event) {
    this.events.push(event);
    this.eventsChanged.next(this.events.slice());
  }

  updateEvent(id: number, newEvent: Event) {
    this.events[id] = newEvent;
    this.eventsChanged.next(this.events.slice());
  }

  deleteEvent(id: number) {
    this.events.splice(id, 1);
    this.eventsChanged.next(this.events.slice());
  }
}
