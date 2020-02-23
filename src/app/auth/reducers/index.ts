import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
  createReducer,
  on
} from '@ngrx/store';
import { User } from '../model/user.model';
import { ActionTypes } from '../action-types';

export const initAuthState: AuthState = {
  user: undefined
}

export interface AuthState {
  user: User;
}

export const authReducer = createReducer(
  initAuthState,
  on(ActionTypes.login, (state, action) => ({
    user: action.user
  })),
  on(ActionTypes.logout, (state, action) => ({
    user: undefined
  }))
);

