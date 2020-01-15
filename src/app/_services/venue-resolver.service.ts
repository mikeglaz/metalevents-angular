import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { Venue } from '../_models/venue.model';
import { DataService } from '../_services/data.service';
import { VenueService } from '../_services/venue.service';


@Injectable({ providedIn: 'root' })
export class VenueResolverService implements Resolve<Venue[]> {
  constructor(private venueService: VenueService){}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    const venues = this.venueService.getVenues();

    if(venues.length === 0){
      return this.venueService.fetchVenues();
    } else {
      return venues;
    }
  }
}
