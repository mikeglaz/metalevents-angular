import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { Event } from './event.model';
import { DataService } from '../shared/data.service';
import { EventService } from './event.service';

@Injectable({
  providedIn: 'root'
})
export class EventResolverService implements Resolve<Event[]> {
  constructor(private dataService: DataService, private eventService: EventService){}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    const events = this.eventService.getEvents();

    if(events.length === 0){
      return this.dataService.fetchEvents();
    } else {
      return events;
    }
  }
}