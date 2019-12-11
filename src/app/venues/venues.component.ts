import { Component, OnInit } from '@angular/core';
import { Venue } from './venue.model';
import { VenueService } from './venue.service';

@Component({
  selector: 'app-venues',
  templateUrl: './venues.component.html',
  styleUrls: ['./venues.component.scss']
})
export class VenuesComponent implements OnInit {
  venues: Venue[];

  constructor(private venueService: VenueService) { }

  ngOnInit() {
    this.venues = this.venueService.getVenues();
  }

}
