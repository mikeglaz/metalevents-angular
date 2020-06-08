import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from "@angular/router";

import { EventService } from '../../_services/event.service';
import { Event } from '../../_models/event.model';
import { AuthService } from '../../_services/auth.service';
import { User } from '../../_models/user.model';
import { VenueService } from '../../_services/venue.service';
import { Venue } from '../../_models/venue.model';
import { Subscription } from 'rxjs';


@Component({
  selector: "app-event-detail",
  templateUrl: "./event-detail.component.html",
  styleUrls: ["./event-detail.component.scss"]
})
export class EventDetailComponent implements OnInit, OnDestroy {
  event: Event;
  venue: Venue;
  currentUser: User;
  eventSubscription: Subscription;

  constructor(
    private eventService: EventService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private venueService: VenueService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.event = this.eventService.getEvent(+params.id);
      this.venue = this.venueService.getVenue(this.event.venue_id);
      console.log(this.event);
    });

    this.authService.getCurrentUser().subscribe(user => {
      this.currentUser = user;
    });

    this.eventSubscription = this.eventService.eventChanged.subscribe(event => {
      console.log(event);
      this.event = event;
    });
  }

  authorized() {
    if(this.currentUser){
      if(this.currentUser.admin){
        return true;
      }

      return this.currentUser.id === this.event.user_id
    }

    return false;
  }

  onDeleteEvent() {
    if (confirm("Are you sure?")) {
      this.eventService.deleteEvent(this.event);
      this.router.navigate(["/events"]);
    }
  }

  ngOnDestroy() {
    this.eventSubscription.unsubscribe();
  }
}
