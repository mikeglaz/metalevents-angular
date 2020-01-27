import { PipeTransform, Pipe } from '@angular/core';

import { Event } from '../_models/event.model';

@Pipe({
  name: 'filterEvents'
})
export class FilterEventsPipe implements PipeTransform{
  transform(events: Event[], venue_id: number) {
    // console.log(events);
    console.log(venue_id);
    let newEvents = events.filter(event => {
      return event.venue_id === venue_id;
    })

    console.log(newEvents);

    return newEvents;
  }
}
