import { createSelector, createFeatureSelector } from '@ngrx/store';

import { User } from './user.model';
import * as actions from './auth.actions';

interface State {
  user: User;
  uid: number;
  authKey: string;
  loggingIn: boolean;
  loggedIn: boolean;
  loginForm: {
    username: string;
    password: string;
    stayLoggedIn: boolean;
  }
}

const initialState: State = {
  user: null,
  uid: null,
  authKey: null,
  loggingIn: false,
  loggedIn: false,
  loginForm: {
    username: '',
    password: '',
    stayLoggedIn: false
  }
}

export function authReducer(state: State = initialState, action: actions.All): State {
  switch (action.type) {
    case actions.RECEIVE_USER: {
      return Object.assign({}, state, { user: action.payload });
    }

    case actions.LOGIN: {
      return Object.assign({}, state, { loggingIn: true });
    }

    case actions.LOGIN_SUCCESS: {
      return Object.assign(
        {},
        state,
        {
          uid: action.payload.uid,
          authKey: action.payload.authKey,
          loggingIn: false,
          loggedIn: true
        }
      );
    }

    case actions.LOGOUT: {
      return initialState;
    }

    case actions.UPDATE_LOGIN_FORM: {
      return Object.assign({}, state, { loginForm: action.payload });
    }

    default: {
      return state;
    }
  }
}

export const getAuthState = createFeatureSelector<State>('auth');

export const getUser = createSelector(
  getAuthState,
  (state: State) => state.user
);

export const getAuthKey = createSelector(
  getAuthState,
  (state: State) => state.authKey
);

export const getLoggedIn = createSelector(
  getAuthState,
  (state: State) => state.loggedIn
);

export const getLoggingIn = createSelector(
  getAuthState,
  (state: State) => state.loggingIn
);

export const getLoginForm = createSelector(
  getAuthState,
  (state: State) => state.loginForm
);