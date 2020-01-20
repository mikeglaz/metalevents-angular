import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { EventService } from '../../_services/event.service';
import { DataService } from '../../_services/data.service';
import { Venue } from '../../_models/venue.model';
import { VenueService } from '../../_services/venue.service';
import { Event } from '../../_models/event.model';


@Component({
  selector: 'app-event-edit',
  templateUrl: './event-edit.component.html',
  styleUrls: ['./event-edit.component.scss']
})
export class EventEditComponent implements OnInit {
  event: Event;
  editMode = false;
  eventForm: FormGroup;
  venues: Venue[];

  constructor(
    private route: ActivatedRoute,
    private eventService: EventService,
    private router: Router,
    private venueService: VenueService)
  {}

  ngOnInit() {
    this.route.params
      .subscribe((params: Params) => {
        this.event = this.eventService.getEvent(+params.id);
        console.log(this.event);
        this.editMode = params.id != null;
        this.venues = this.venueService.getVenues();
        this.initForm();
      });


  }

  onSubmit() {
    if(this.editMode) {
      this.eventService.updateEvent(this.event.id, this.eventForm.value);
      // this.dataService.updateEvent(this.id, this.eventForm.value);
    } else {
      this.eventService.newEvent(this.eventForm.value);
      // this.dataService.saveEvent(this.eventForm.value);
    }

    this.onCancel();
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }


  private initForm() {
    let eventName: string = '';
    let eventDescription: string = '';
    let eventVenue: number;
    let eventDate: Date = null;

    if(this.editMode){
      eventName = this.event.name;
      eventDescription = this.event.description;
      eventVenue = this.event.venue_id;
      eventDate = this.event.date;
    }

    this.eventForm = new FormGroup({
      name: new FormControl(eventName, Validators.required),
      description: new FormControl(eventDescription, Validators.required),
      date: new FormControl(eventDate, Validators.required),
      venue_id: new FormControl(eventVenue, Validators.required)
    });
  }


}
