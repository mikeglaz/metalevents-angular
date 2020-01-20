import { Injectable } from "@angular/core";
import { Subject, Observable } from 'rxjs';
import { HttpClient } from "@angular/common/http";

import { Event } from "../_models/event.model";
import { AuthService } from "./auth.service";
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: "root"
})
export class EventService {
  eventsChanged: Subject<Event[]>;
  eventChanged: Subject<Event>;

  private events: Event[] = [];

  constructor(private http: HttpClient, private authService: AuthService) {
     this.eventsChanged = new Subject<Event[]>();
     this.eventChanged = new Subject<Event>();
  }

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
    this.saveEvent(event).subscribe(savedEvent => {
      this.events.push(savedEvent);
      this.eventsChanged.next(this.events.slice());
    });
  }

  updateEvent(id: number, event: Event) {
    this.http.put(`http://localhost:3000/events/${id}`, { event: event })
      .subscribe(response => {
        const eventIndex = this.events.findIndex(event => event.id === id);
        const updatedEvent = { ...event, id: id };

        this.events[eventIndex] = updatedEvent;
        this.eventChanged.next(updatedEvent);
        this.eventsChanged.next(this.events.slice());
      });
  }

  deleteEvent(event: Event) {
    let eventIndex = this.events.indexOf(event);

    this.http.delete(`http://localhost:3000/events/${event.id}`).subscribe(() => {
      this.events.splice(eventIndex, 1);
      this.eventsChanged.next(this.events.slice());
    });
  }

  saveEvent(event: Event): Observable<Event> {
    return this.http
      .post<Event>("http://localhost:3000/events", { event: event });
  }

  // reloading eveints/:id does not work - with the subscription here

  // fetchEvents(): void {
  //   this.http.get<Event[]>("http://localhost:3000/events").subscribe(events => {
  //     this.setEvents(events);
  //   });
  // }

  fetchEvents(): Observable<Event[]> {
    return this.http.get<Event[]>("http://localhost:3000/events").pipe(
      tap(events => {
        this.setEvents(events);
      })
    );
  }

  // updateEventApi(id: number, event: Event): void {
  //   this.http.put(`http://localhost:3000/events/${id}`, { event: event })
  //     .subscribe(console.log);
  // }
}
