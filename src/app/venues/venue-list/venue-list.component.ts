import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Venue } from '../../_models/venue.model';
import { VenueService } from '../../_services/venue.service';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-venue-list',
  templateUrl: './venue-list.component.html',
  styleUrls: ['./venue-list.component.scss']
})
export class VenueListComponent implements OnInit {
  // venues: Venue[];

  venues: Observable<{ venues: Venue[] }>;


  constructor(
    private venueService: VenueService,
    private store: Store<{ venueList: { venues: Venue[] } }>
  ) { }

  ngOnInit() {
    this.venues = this.store.select('venueList');

    // this.venues.subscribe((venues) => {
    //   console.log(venues);
    // })
    // this.venueService.venuesChanged.subscribe((venues: Venue[]) => {
    //   this.venues = venues;
    // });
    //
    // this.venues = this.venueService.getVenues();

  }

}
