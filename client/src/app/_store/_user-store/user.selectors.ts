import { createSelector } from "@ngrx/store";
import { AppState } from "../app.state";
import { UserState } from "./user.reducers";

export const selectUsers = ( state: AppState) => state.user;

export const selectAllUsers = createSelector(
    selectUsers,
    (state: UserState) => state.users
);

export const selectOneUser = createSelector(
    selectUsers,
    (state: UserState) => state.oneUser
);