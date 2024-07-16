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

export const userLoadingSelector = createSelector(
    selectUsers,
    (state: UserState) => state.isLoading
);

export const userErrorSelector = createSelector(
    selectUsers,
    (state: UserState) => state.error
);

export const userLocationSelector = createSelector(
    selectUsers,
    (state: UserState) => state.oneUser?.userLocation
)