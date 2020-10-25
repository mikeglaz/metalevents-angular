import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

import { EventService } from '../../_services/event.service';
import { Venue } from '../../_models/venue.model';
import { VenueService } from '../../_services/venue.service';
import { Event } from '../../_models/event.model';
import * as fromApp from 'src/app/store/app.reducer';
import * as EventActions from 'src/app/events/store/event.actions';



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
    private venueService: VenueService,
    private store: Store<fromApp.AppState>)
  {}

  ngOnInit() {
    this.route.params
      .subscribe((params: Params) => {
        this.event = this.eventService.getEvent(+params.id);
        this.editMode = params.id != null;
        this.venues = this.venueService.getVenues();
        this.initForm();
      });

      // this.route.params.subscribe((params: Params) => {
      //   this.store.select('eventList').subscribe(eventList => {
      //     this.event = eventList.events.find(event => {
      //       return event.id === (+params.id);
      //     });
      //     this.venues = this.venueService.getVenues();
      //
      //   });
      //
      //
      //   // this.venue = this.venueService.getVenue(+params.id);
      //   this.editMode = params.id != null;
      //   this.initForm();
      // });

  }

  onSubmit() {
    if(this.editMode) {
      this.store.dispatch(new EventActions.UpdateEvent({ id: this.event.id, event: this.eventForm.value}));
      // this.eventService.updateEvent(this.event.id, this.eventForm.value);
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
