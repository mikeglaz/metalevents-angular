import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Event } from '../_models/event.model';


@Injectable({
  providedIn: 'root'
})
export class EventService {
  eventsChanged = new Subject<Event[]>();

  private events: Event[] = [];

  setEvents(events: Event[]) {
    this.events = events;
    this.eventsChanged.next(this.events.slice());
  }

  getEvents(): Event[] {
    return this.events.slice();
  }

  getEvent(id: number): Event {
    return this.events.find(event => event.id === id);
  }

  newEvent(event: Event) {
    this.events.push(event);
    this.eventsChanged.next(this.events.slice());
  }

  updateEvent(id: number, newEvent: Event) {
    let eventIndex = this.events.findIndex(event => event.id === id);

    this.events[eventIndex] = {...newEvent, id: id};
    this.eventsChanged.next(this.events.slice());
  }

  deleteEvent(id: number) {
    this.events.splice(id, 1);
    this.eventsChanged.next(this.events.slice());
  }
}
