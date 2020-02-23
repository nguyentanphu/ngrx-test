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
import { AuthActions } from '../action-types';

export const initAuthState: AuthState = {
  user: undefined
};

export interface AuthState {
  user: User;
}

export const authReducer = createReducer(
  initAuthState,
  on(AuthActions.login, (state, action) => ({
    user: action.user
  })),
  on(AuthActions.logout, (state, action) => ({
    user: undefined
  }))
);
