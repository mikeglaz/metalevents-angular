import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, Subject } from 'rxjs';

import { AuthService } from './auth.service';
import { Venue } from "../_models/venue.model";
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: "root"
})
export class VenueService {
  public venuesChanged = new Subject<Venue[]>();
  private venues: Venue[] = [];

  constructor(private http: HttpClient, private authService: AuthService) {}

  getVenues(): Venue[] {
    return this.venues.slice();
  }

  getVenue(id: number): Venue {
    return this.venues.find(venue => venue.id === id);
  }

  setVenues(venues: Venue[]) {
    this.venues = venues;
    this.venuesChanged.next(this.venues.slice());
  }

  newVenue(venue: Venue) {
    this.saveVenue(venue).subscribe(savedVenue => {
      this.venues.push(savedVenue);
      this.venuesChanged.next(this.venues.slice());
    });
  }

  updateVenue(id: number, venue: Venue) {
    let venueIndex = this.venues.findIndex(venue => venue.id === id);

    this.venues[venueIndex] = { ...venue, id: id };
    this.venuesChanged.next(this.venues.slice());

    this.http.put(`http://localhost:3000/venues/${id}`, { venue: venue })
      .subscribe();
  }

  deleteVenue(venue: Venue) {
    let venueIndex = this.venues.indexOf(venue);

    this.http.delete(`http://localhost:3000/venues/${venue.id}`).subscribe(() => {
      this.venues.splice(venueIndex, 1);
      this.venuesChanged.next(this.venues.slice());
    });
  }

  saveVenue(venue: Venue): Observable<Venue> {
    return this.http
      .post<Venue>("http://localhost:3000/venues", { venue: venue });
  }

  fetchVenues(): Observable<Venue[]> {
    return this.http.get<Venue[]>("http://localhost:3000/venues").pipe(
      tap(venues => {
        this.setVenues(venues);
      })
    )
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
