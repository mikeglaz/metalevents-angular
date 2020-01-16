import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';

import { Venue } from '../../_models/venue.model';
import { VenueService } from '../../_services/venue.service';

@Component({
  selector: 'app-venue-detail',
  templateUrl: './venue-detail.component.html',
  styleUrls: ['./venue-detail.component.scss']
})
export class VenueDetailComponent implements OnInit {
  extLinkIcon = faExternalLinkAlt;
  venue: Venue;

  constructor(private route: ActivatedRoute, private venueService: VenueService) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.venue = this.venueService.getVenue(+params.id);
    })
  }

}
