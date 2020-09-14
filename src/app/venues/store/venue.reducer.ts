import { Action } from '@ngrx/store';

import { Venue } from 'src/app/_models/venue.model';
import { ADD_VENUE } from './venue.actions';

const initialState = {
  venues: [
    new Venue(1, 'Reggies Rock Club', '2015 S State St', 'Chicago', 'IL', 'https://www.reggieslive.com/'),
    new Venue(2, 'Vic Theatre', '3145 N Sheffield Ave', 'Chicago', 'IL', 'http://www.victheatre.com/'),
    new Venue(3, 'Double Door', '1551 N Damen Ave', 'Chicago', 'IL', 'http://doubledoor.com/')
  ]
};

export function venueReducer(state = initialState, action: Action) {
  switch(action.type) {
    case 'ADD_VENUE':
      return {
        ...state,
        venues: [...state.venues, action]
      };
  }
}
