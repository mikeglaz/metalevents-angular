import { Action } from '@ngrx/store';
import { Venue } from 'src/app/_models/venue.model';

export const ADD_VENUE = 'ADD_VENUE';
export const UPDATE_VENUE = 'UPDATE_VENUE';
export const DELETE_VENUE = 'DELETE_VENUE';

export class AddVenue implements Action {
  readonly type = ADD_VENUE;

  constructor(public payload: Venue) {}
}

export class UpdateVenue implements Action {
  readonly type = UPDATE_VENUE;

  constructor(public payload: { index: number, venue: Venue }) {}
}

export class DeleteVenue implements Action {
  readonly type = DELETE_VENUE;

  constructor(public payload: number) {}
}

export type VenueActions =
  | AddVenue
  | UpdateVenue
  | DeleteVenue;
