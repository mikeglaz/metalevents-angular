import { Venue } from 'src/app/_models/venue.model';
import * as VenueActions from './venue.actions';

const initialState = {
  venues: [
    new Venue(1, 'Reggies Xock Club', '2015 S State St', 'Chicago', 'IL', 'https://www.reggieslive.com/'),
    new Venue(2, 'Vic Theatre', '3145 N Sheffield Ave', 'Chicago', 'IL', 'http://www.victheatre.com/'),
    new Venue(3, 'Double Door', '1551 N Damen Ave', 'Chicago', 'IL', 'http://doubledoor.com/')
  ]
};

export function venueReducer(
  state = initialState,
  action: VenueActions.VenueActions
) {
  switch(action.type) {
    case VenueActions.ADD_VENUE:
      return {
        ...state,
        venues: [...state.venues, action.payload]
      };

      case VenueActions.UPDATE_VENUE:
        const venue = state.venues[action.payload.index];
        const updatedVenue = {
          ...venue,
          ...action.payload.venue
        };

        const updatedVenues = [...state.venues];
        updatedVenues[action.payload.index] = updatedVenue;

        return {
          ...state,
          venues: updatedVenues
        };


      case VenueActions.DELETE_VENUE:


        return {
          ...state,
          venues: state.venues.filter((venue, idx) => {
            return idx !== action.payload;
          })
        };

      default:
        return state;
  }
}
