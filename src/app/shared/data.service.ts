import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { EventService } from '../events/event.service';
import { Event } from '../events/event.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(
    private http: HttpClient,
    private eventService: EventService) {}

  saveEvent(event: Event): void {
    // const events = this.eventService.getEvents();
    this.http.post('http://localhost:3000/events', { event: event })
      .subscribe(console.log);
  }

  updateEvent(id: number, event: Event): void {
    this.http.put(`http://localhost:3000/events/${id}`, { event: event })
      .subscribe(console.log);
  }

  fetchEvents(): void {
    this.http.get<Event[]>('http://localhost:3000/events')
      .subscribe(events => {
        this.eventService.setEvents(events);
      })
  }
}
