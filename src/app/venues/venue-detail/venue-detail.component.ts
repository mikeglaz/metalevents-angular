import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';

import { Venue } from '../../_models/venue.model';
import { VenueService } from '../../_services/venue.service';
import { AuthService } from '../../_services/auth.service';
import { User } from '../../_models/user.model';
import * as VenueActions from 'src/app/venues/store/venue.actions';

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
    private authService: AuthService,
    private store: Store<{ venue: { venues: Venue[] } }>) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.store.select('venue').subscribe(venueArray => {
        this.venue = venueArray.venues.find(venue => {
          return venue.id === (+params.id);
        })
      });
    });


    this.authService.getCurrentUser().subscribe(user => {
      this.currentUser = user;
    });
  }

  onDelete() {
    if (confirm("Are you sure?")) {
      // this.venueService.deleteVenue(this.venue);
      this.store.dispatch(new VenueActions.DeleteVenue(this.venue.id));
      this.router.navigate(["/venues"]);
    }
  }

}
