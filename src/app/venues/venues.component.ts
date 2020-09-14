import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { Venue } from '../_models/venue.model';
import { VenueService } from '../_services/venue.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-venues',
  templateUrl: './venues.component.html',
  styleUrls: ['./venues.component.scss']
})
export class VenuesComponent implements OnInit {
  // venues: Observable<{ venues: Venue[] }>;

  venues: Venue[];

  constructor(
    private venueService: VenueService,
    // private store: Store<{ venue: { venues: Venue[] } }>
  ) { }

  ngOnInit() {
    // this.venues = this.store.select('venue')
    // this.venues = this.venueService.getVenues();
  }

}
