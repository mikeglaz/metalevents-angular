import { Component, OnInit } from '@angular/core';

import { Venue } from '../../_models/venue.model';
import { VenueService } from '../../_services/venue.service';

@Component({
  selector: 'app-venue-list',
  templateUrl: './venue-list.component.html',
  styleUrls: ['./venue-list.component.scss']
})
export class VenueListComponent implements OnInit {
  venues: Venue[];

  constructor(private venueService: VenueService) { }

  ngOnInit() {

    this.venueService.venuesChanged.subscribe((venues: Venue[]) => {
      this.venues = venues;
    });

    this.venues = this.venueService.getVenues();

  }

}
