import { createSelector, createFeatureSelector } from "@ngrx/store";
import { AuthState } from "./reducers";

const authFeatureSelector = createFeatureSelector<AuthState>("auth");

export const isLoggedInSelector = createSelector(
  authFeatureSelector,
  (auth: AuthState) => !!auth.user
);

export const isLoggedOutSelector = createSelector(
  isLoggedInSelector,
  loggedIn => !loggedIn
);
