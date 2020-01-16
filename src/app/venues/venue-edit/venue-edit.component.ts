import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { FormGroup, FormControl, Validators  } from '@angular/forms';

import { Venue } from '../../_models/venue.model';
import { VenueService } from '../../_services/venue.service';


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
    private router: Router) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.venue = this.venueService.getVenue(+params.id);
      this.editMode = params.id != null;
      this.initForm();
    });
  }

  onSubmit() {
    if(this.editMode) {
      this.venueService.updateVenue(this.venue.id, this.venueForm.value);
      // this.dataService.updateEvent(this.id, this.eventForm.value);
    } else {
      this.venueService.newVenue(this.venueForm.value);
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
