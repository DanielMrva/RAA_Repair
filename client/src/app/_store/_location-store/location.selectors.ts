import { createSelector } from "@ngrx/store";
import { AppState } from "../app.state";
import { LocationState } from "./location.reducers";
import { Location } from "@app/graphql/schemas";

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
    (state: LocationState) => state.isLoadingOneLoc
);

export const manyLocationsLoadingSelector = createSelector(
    selectLocations,
    (state: LocationState) => state.isLoadingLocations
);

export const locNamesLoadingSelector = createSelector(
    selectLocations,
    (state: LocationState) => state.isLoadingLocNames
);

export const locationErrorSelector = createSelector(
    selectLocations,
    (state: LocationState) => state.error
);

export const orgLocNames = (orgName: string) => createSelector(
    selectLocationNames,
    (locations: Location[]): string[] => {
        if (!orgName) {
          return [];
        }
        return locations
          .filter(loc => loc.orgName === orgName)
          .map(loc => loc.locationName);
      }
)