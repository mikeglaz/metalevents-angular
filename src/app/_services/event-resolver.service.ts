import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { Event } from '../_models/event.model';
import { EventService } from '../_services/event.service';


@Injectable({ providedIn: 'root' })
export class EventResolverService implements Resolve<Event[]> {
  constructor(private eventService: EventService){}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    const events = this.eventService.getEvents();

    if(events.length === 0){
      return this.eventService.fetchEvents();
    } else {
      return events;
    }
  }
}
