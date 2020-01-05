import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { Event } from '../_models/event.model';
import { EventService } from './event.service';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(
    private http: HttpClient,
    private eventService: EventService,
    private authService: AuthService) {}

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


    // return this.http.get<Event[]>('http://localhost:3000/events', {

    //     headers: new HttpHeaders().set('Authorization', token)
    //   })
