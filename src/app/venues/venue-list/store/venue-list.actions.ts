import { Action } from '@ngrx/store';
import { Venue } from 'src/app/_models/venue.model';

export const ADD_VENUE = 'ADD_VENUE';

export class AddVenue implements Action {
  readonly type = ADD_VENUE;
  payload: Venue;
}
