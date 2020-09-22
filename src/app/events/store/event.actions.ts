import { Action } from '@ngrx/store';
import { Event } from 'src/app/_models/event.model';

export const ADD_EVENT = 'ADD_EVENT';
export const UPDATE_EVENT = 'UPDATE_EVENT';
export const DELETE_EVENT = 'DELETE_EVENT';

export class AddEvent implements Action {
  readonly type = ADD_EVENT;

  constructor(public payload: Event) {}
}

export class UpdateEvent implements Action {
  readonly type = UPDATE_EVENT;

  constructor(public payload: { id: number, event: Event }){}
}

export class DeleteEvent implements Action {
  readonly type = DELETE_EVENT

  constructor(public payload: number) {

  }
}

export type EventActions =
| AddEvent
| UpdateEvent
| DeleteEvent
