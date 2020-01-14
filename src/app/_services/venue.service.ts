import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';

import { AuthService } from './auth.service';
import { Venue } from "../_models/venue.model";

@Injectable({
  providedIn: "root"
})
export class VenueService {
  private venues: Venue[] = [];

  constructor(private http: HttpClient, private authService: AuthService) {}

  getVenues(): Venue[] {
    return this.venues.slice();
  }

  fetchVenues() {
    this.http.get<Venue[]>("http://localhost:3000/venues");
  }
}

// private venues: Venue[] = [
//   new Venue(
//     "Reggies Rock Club",
//     "2015 S State St",
//     "Chicago",
//     "IL",
//     "https://www.reggieslive.com/"
//   ),
//   new Venue(
//     "Vic Theatre",
//     "3145 N Sheffield Ave",
//     "Chicago",
//     "IL",
//     "http://www.victheatre.com/"
//   ),
//   new Venue(
//     "Double Door",
//     "1551 N Damen Ave",
//     "Chicago",
//     "IL",
//     "http://doubledoor.com/"
//   )
// ];
