import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';

import { Venue } from '../../_models/venue.model';
import { VenueService } from '../../_services/venue.service';
import { AuthService } from '../../_services/auth.service';
import { User } from '../../_models/user.model';

@Component({
  selector: 'app-venue-detail',
  templateUrl: './venue-detail.component.html',
  styleUrls: ['./venue-detail.component.scss']
})
export class VenueDetailComponent implements OnInit {
  extLinkIcon = faExternalLinkAlt;
  currentUser: User;
  venue: Venue;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private venueService: VenueService,
    private authService: AuthService) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.venue = this.venueService.getVenue(+params.id);
    });

    this.authService.getCurrentUser().subscribe(user => {
      this.currentUser = user;
    });
  }

  onDeleteEvent() {
    if (confirm("Are you sure?")) {
      this.venueService.deleteVenue(this.venue.id);
      this.router.navigate(["/venues"]);
    }
  }

}
