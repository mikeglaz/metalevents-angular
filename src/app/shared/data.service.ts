import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { Event } from '../events/event.model';
import { EventService } from '../events/event.service';

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

  fetchEvents(): Observable<Event[]> {
    return this.http.get<Event[]>('http://localhost:3000/events')
      .pipe(
        tap(events => {
          this.eventService.setEvents(events);
        })
      );
  }
}
