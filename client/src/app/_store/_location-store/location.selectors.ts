import { createSelector } from "@ngrx/store";
import { AppState } from "../app.state";
import { LocationState } from "./location.reducers";

export const selectLocations = ( state: AppState ) => state.location;

export const selectAllLocations = createSelector(
    selectLocations,
    (state: LocationState) => state.locations
);

export const selectOneLocation = createSelector(
    selectLocations,
    (state: LocationState) => state.oneLocation
);

export const selectLocationNames = createSelector(
    selectLocations,
    (state: LocationState) => state.locationNames
)

export const locationLoadingSelector = createSelector(
    selectLocations,
    (state: LocationState) => state.isLoading
);

export const locationErrorSelector = createSelector(
    selectLocations,
    (state: LocationState) => state.error
);