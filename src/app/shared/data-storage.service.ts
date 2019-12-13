import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { EventService } from '../events/event.service';
import { Event } from '../events/event.model';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private eventService: EventService) {}

  saveEvent(event: Event) {
    // const events = this.eventService.getEvents();
    this.http.post('http://localhost:3000/events', { event: event }).subscribe(console.log);
  }
}
