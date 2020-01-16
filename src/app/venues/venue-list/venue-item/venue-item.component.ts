import { Component, OnInit, Input } from '@angular/core';

import { Venue } from '../../../_models/venue.model';


@Component({
  selector: 'app-venue-item',
  templateUrl: './venue-item.component.html',
  styleUrls: ['./venue-item.component.scss']
})
export class VenueItemComponent implements OnInit {
  @Input() venue: Venue;

  constructor() { }

  ngOnInit() {
  }

}
