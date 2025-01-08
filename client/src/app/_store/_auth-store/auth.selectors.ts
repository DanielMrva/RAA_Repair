import { createSelector } from "@ngrx/store";
import { AppState } from "../app.state";
import { AuthState } from "./auth.reducers";
import { AccessLevel } from "@app/utils/constants";

export const selectAuth = ( state: AppState ) => state.auth;

export const selectUserName = createSelector(
    selectAuth,
    (state: AuthState) => state.username
);

export const selectAccessLevel = createSelector(
    selectAuth,
    (state: AuthState): AccessLevel | null => state.accessLevel
);

export const selectOrgName = createSelector(
    selectAuth,
    (state: AuthState) => state.orgName
);

export const selectUserLocation = createSelector(
    selectAuth,
    (state: AuthState) => state.userLocation
);

export const selectIsAuthenticated = createSelector(
    selectAuth,
    (state: AuthState) => state.isAuthenticated
);