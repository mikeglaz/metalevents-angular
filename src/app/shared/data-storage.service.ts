import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { EventService } from '../events/event.service';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  constructor(private http: HttpClient, private eventService: EventService) {}

  saveEvents() {

  }
}
