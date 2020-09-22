import * as fromVenueList from '../venues/store/venue.reducer';
import * as fromEventList from '../events/store/event.reducer';
import * as fromAuth from '../auth/store/auth.reducer';
import { ActionReducerMap } from '@ngrx/store';

export interface AppState {
  eventList: fromEventList.State;
  venueList: fromVenueList.State;
  auth: fromAuth.State;
}

export const appReducer: ActionReducerMap<AppState> = {
  auth: fromAuth.authReducer,
  venueList: fromVenueList.venueReducer,
  eventList: fromEventList.eventReducer
};
