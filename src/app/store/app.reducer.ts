import * as fromVenueList from '../venues/store/venue.reducer';
import * as fromAuth from '../auth/store/auth.reducer';
import { ActionReducerMap } from '@ngrx/store';

export interface AppState {
  venueList: fromVenueList.State;
  auth: fromAuth.State;
}

export const appReducer: ActionReducerMap<AppState> = {
  venueList: fromVenueList.venueReducer,
  auth: fromAuth.authReducer
};
