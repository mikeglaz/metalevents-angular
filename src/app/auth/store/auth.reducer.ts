import { User } from 'src/app/_models/user.model';


export interface State {
  user: User;
}

const initialState: State = {
  user: null
};

export function authReducer(state = initialState, action) {
  return state;
}
