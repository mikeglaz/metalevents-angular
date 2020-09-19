import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { FormGroup, FormControl, Validators  } from '@angular/forms';
import { Store } from '@ngrx/store';

import { Venue } from '../../_models/venue.model';
import { VenueService } from 'src/app/_services/venue.service';
import * as VenueActions from 'src/app/venues/store/venue.actions';
import * as fromVenue from 'src/app/venues/store/venue.reducer';


type State = {
  abbr: string,
  name: string
};

@Component({
  selector: 'app-venue-edit',
  templateUrl: './venue-edit.component.html',
  styleUrls: ['./venue-edit.component.scss']
})
export class VenueEditComponent implements OnInit {
  states: State[] = [
    {
      abbr: 'IL',
      name:  'Illinois'
    },
    { abbr: 'IN',
      name: 'Indiana'
    },
    { abbr: 'WI',
      name: 'Wisconsin'
    }
  ];

  venue: Venue;
  editMode = false;
  venueForm: FormGroup;


  constructor(
    private route: ActivatedRoute,
    private venueService: VenueService,
    private router: Router,
    private store: Store<fromVenue.AppState>) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.store.select('venueList').subscribe(venueArray => {
        this.venue = venueArray.venues.find(venue => {
          return venue.id === (+params.id);
        })
      });

      // this.venue = this.venueService.getVenue(+params.id);
      this.editMode = params.id != null;
      this.initForm();
    });
  }

  onSubmit() {

    const newVenue = new Venue(
      666,
      this.venueForm.value.name,
      this.venueForm.value.address,
      this.venueForm.value.city,
      this.venueForm.value. state,
      this.venueForm.value.url);

    if(this.editMode) {
      this.store.dispatch(new VenueActions.UpdateVenue({ id: this.venue.id, venue: this.venueForm.value}));
      // this.venueService.updateVenue(this.venue.id, this.venueForm.value);
      // this.dataService.updateEvent(this.id, this.eventForm.value);
    } else {
      this.store.dispatch(new VenueActions.AddVenue(newVenue));
      // this.venueService.newVenue(this.venueForm.value);
      // this.dataService.saveEvent(this.eventForm.value);
    }

    this.onCancel();
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }


  private initForm() {
    let venueName: string = '';
    let venueAddress: string = '';
    let venueCity: string = '';
    let venueState: string = 'IL';
    let venueUrl: string = '';

    if(this.editMode){
      venueName = this.venue.name;
      venueAddress = this.venue.address;
      venueCity = this.venue.city;
      venueState = this.venue.state ;
      venueUrl = this.venue.url;
    }

    this.venueForm = new FormGroup({
      name: new FormControl(venueName, Validators.required),
      address: new FormControl(venueAddress, Validators.required),
      city: new FormControl(venueCity, Validators.required),
      state: new FormControl(venueState, Validators.required),
      url: new FormControl(venueUrl, Validators.required)
    });
  }

}
