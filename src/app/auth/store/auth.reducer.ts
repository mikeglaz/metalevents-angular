import { User } from 'src/app/_models/user.model';
import * as AuthActions from './auth.actions';

export interface State {
  user: User;
}

const initialState: State = {
  user: null
};

export function authReducer(
  state: State = initialState,
  action: AuthActions.AuthActions
) {
  switch(action.type) {
    case AuthActions.LOGIN:
      const user = new User(
        action.payload.id,
        action.payload.name,
        action.payload.email,
        action.payload.admin
      );

      return {
        ...state,
        user: user
      };

    case AuthActions.LOGOUT:
      return {
        ...state,
        user: null
      };
      
    default:
      return state;
  }
}
