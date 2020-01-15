import { Component, OnInit } from '@angular/core';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';

import { Venue } from '../_models/venue.model';
import { VenueService } from '../_services/venue.service';


@Component({
  selector: 'app-venues',
  templateUrl: './venues.component.html',
  styleUrls: ['./venues.component.scss']
})
export class VenuesComponent implements OnInit {
  extLinkIcon = faExternalLinkAlt;

  venues: Venue[];

  constructor(private venueService: VenueService) { }

  ngOnInit() {
    this.venues = this.venueService.getVenues();
  }

}
