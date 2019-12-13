import { Component, OnInit } from '@angular/core';

import { EventService } from './event.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {
  selectedEvent: Event;

  constructor() { }

  ngOnInit() {
    // this.eventService.eventSelected.subscribe(
    //   (event: Event) => {
    //     this.selectedEvent = event;
    //     console.log(event);
    //   }
    // );
  }

}
