import { User } from 'src/app/_models/user.model';
import * as AuthActions from './auth.actions';

export interface State {
  user: User;
}

const initialState: State = {
  user: null
};

export function authReducer(state = initialState, action: AuthActions.AuthActions) {
  return state;
}
