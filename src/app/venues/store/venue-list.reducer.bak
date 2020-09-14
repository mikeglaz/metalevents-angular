import { Venue } from 'src/app/_models/venue.model';
import * as VenueListActions from './venue-list.actions';

const initialState = {
  venues: [
    new Venue(1, 'Reggies Xock Club', '2015 S State St', 'Chicago', 'IL', 'https://www.reggieslive.com/'),
    new Venue(2, 'Vic Theatre', '3145 N Sheffield Ave', 'Chicago', 'IL', 'http://www.victheatre.com/'),
    new Venue(3, 'Double Door', '1551 N Damen Ave', 'Chicago', 'IL', 'http://doubledoor.com/')
  ]
};

export function venueListReducer(
  state = initialState,
  action: VenueListActions.AddVenue
) {
  switch(action.type) {
    case VenueListActions.ADD_VENUE:
      return {
        ...state,
        venues: [...state.venues, action.payload]
      };

    default:
      return state;
  }
}
