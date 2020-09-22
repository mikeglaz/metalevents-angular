import { Action } from '@ngrx/store';

import { Event } from 'src/app/_models/event.model';
import * as EventActions from './event.actions';

export interface State {
  events: Event[];
}

const initialState: State = {
  events: [
    new Event('Slayer', 'The Tour To End All Tours', new Date('2020-08-31 19:00:00'), 1, 3, 1),
    new Event('Ghost', 'A Pale Tour Named Death', new Date('2020-08-31 19:00:00'), 1, 3, 2),
    new Event('Metallica', 'Justice For All Tour 2020', new Date('2020-08-31 19:00:00'), 1, 3, 3)
  ]
};

export function eventReducer(state: State = initialState, action: EventActions.EventActions) {
  switch(action.type) {
    case EventActions.ADD_EVENT:
      return {
        ...state,
        events: [...state.events, action.payload]
      };

    case EventActions.UPDATE_EVENT:
      const eventIndex = state.events.findIndex((event) => {
        return event.id === action.payload.id;
      });

      const event = state.events[eventIndex];

      const updatedEvent = {
        ...event,
        ...action.payload.event
      };

      const updatedEvents = [...state.events];
      updatedEvents[eventIndex] = updatedEvent;

      return {
        ...state,
        events: updatedEvents
      };

    default:
        return state;
  }
}
