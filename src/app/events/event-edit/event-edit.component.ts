import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { EventService } from '../../_services/event.service';
import { DataService } from '../../_services/data.service';



@Component({
  selector: 'app-event-edit',
  templateUrl: './event-edit.component.html',
  styleUrls: ['./event-edit.component.scss']
})
export class EventEditComponent implements OnInit {
  id: number;
  editMode = false;
  eventForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private eventService: EventService,
    private router: Router,
    private dataService: DataService)
  {}

  ngOnInit() {
    this.route.params
      .subscribe((params: Params) => {
        this.id = +params.id;
        this.editMode = params.id != null;
        this.initForm();
      });
  }

  onSubmit() {
    if(this.editMode) {
      this.eventService.updateEvent(this.id, this.eventForm.value);
      this.dataService.updateEvent(this.id, this.eventForm.value);
    } else {
      this.eventService.newEvent(this.eventForm.value);
      this.dataService.saveEvent(this.eventForm.value);
    }

    this.onCancel();
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }


  private initForm() {
    let eventName: string;
    let eventDescription: string;
    let eventVenue: string;
    let eventDate: Date;

    if(this.editMode){
      const event = this.eventService.getEvent(this.id);
      eventName = event.name;
      eventDescription = event.description;
      eventVenue = event.venue;
      eventDate = event.date;
    }

    this.eventForm = new FormGroup({
      name: new FormControl(eventName, Validators.required),
      description: new FormControl(eventDescription, Validators.required),
      date: new FormControl(eventDate, Validators.required),
      venue: new FormControl(eventVenue, Validators.required)
    });
  }


}
