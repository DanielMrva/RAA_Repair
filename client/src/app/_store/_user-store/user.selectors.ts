import { createSelector } from "@ngrx/store";
import { AppState } from "../app.state";
import { UserState } from "./user.reducers";

export const selectUser = ( state: AppState) => state.user;
export const selectAllUsers = createSelector(
    selectUser,
    (state: UserState) => state.users
);