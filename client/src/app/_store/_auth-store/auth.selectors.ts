import { createSelector } from "@ngrx/store";
import { AppState } from "../app.state";
import { AuthState } from "./auth.reducers";

export const selectAuth = ( state: AppState ) => state.auth;

export const selectUserName = createSelector(
    selectAuth,
    (state: AuthState) => state.username
);

export const selectAccessLevel = createSelector(
    selectAuth,
    (state: AuthState) => state.accessLevel
);

export const selectOrgName = createSelector(
    selectAuth,
    (state: AuthState) => state.orgName
);