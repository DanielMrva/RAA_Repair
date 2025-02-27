import { createReducer, on } from "@ngrx/store";
import * as LocationActions from "./location.actions";
import { Location } from "@app/graphql/schemas";

export interface LocationState {
    oneLocation: Location | null;
    locations: Location[];
    locationNames: Location[];
    error: string | null;
    isLoadingOneLoc: boolean;
    isLoadingLocations: boolean;
    isLoadingLocNames: boolean;
};

export const initialState: LocationState = {
    oneLocation: null,
    locations: [],
    locationNames: [],
    error: null,
    isLoadingOneLoc: false,
    isLoadingLocations: false,
    isLoadingLocNames: false
};

export const locationReducer = createReducer(
    initialState,

    on(LocationActions.loadOneLocation, (state) => ({
        ...state,
        oneLocation: null,
        isLoadingOneLoc: true,
        error: null,
    })),

    on(LocationActions.loadOneLocationSuccess, (state, action ) => ({
        ...state,
        oneLocation: action.location,
        isLoadingOneLoc: false,
        error: null,
    })),

    on(LocationActions.loadOneLocationFailure, (state, action) => ({
        ...state,
        oneLocation: null,
        isLoadingOneLoc: false,
        error: action.error
    })),

    on(LocationActions.loadLocationByName, (state) => ({
        ...state,
        oneLocation: null,
        isLoadingOneLoc: true,
        error: null,
    })),

    on(LocationActions.loadLocationByNameSuccess, (state, { oneLocation } ) => ({
        ...state,
        oneLocation: oneLocation,
        isLoadingOneLoc: false,
        error: null,
    })),

    on(LocationActions.loadLocationByNameFailure, (state, action) => ({
        ...state,
        oneLocation: null,
        isLoadingOneLoc: false,
        error: action.error
    })),

    on(LocationActions.loadAllLocations, (state) => ({
        ...state,
        isLoadingLocations: true,
        error: null,
    })),

    on(LocationActions.loadAllLocationsSuccess, (state, { locations }) => ({
        ...state,
        locations: locations as Location[],
        isLoadingLocations: false,
        error: null,
    })),

    on(LocationActions.loadAllLocationsFailure, (state, { error }) => ({
        ...state,
        isLoadingLocations: false,
        error: error
    })),

    on(LocationActions.loadOrgLocations, (state) => ({
        ...state,
        isLoadingLocations: true,
        error: null,
    })),

    on(LocationActions.loadOrgLocationsSuccess, (state, { locations }) => ({
        ...state,
        locations: locations as Location[],
        isLoadingLocations: false,
        error: null,
    })),

    on(LocationActions.loadOrgLocationsFailure, (state, { error }) => ({
        ...state,
        isLoadingLocations: false,
        error: error
    })),

    on(LocationActions.addLocation, (state) => ({
        ...state,
        oneLocation: null,
        isLoadingOneLoc: true,
        error: null,
    })),

    on(LocationActions.addLocationSuccess, (state, { location }) => ({
        ...state,
        oneLocation: location as Location,
        isLoadingOneLoc: false,
        error: null,
    })),

    on(LocationActions.addLocationFailure, (state, { error }) => ({
        ...state,
        isLoadingOneLoc: false,
        error: error
    })),

    on(LocationActions.editLocation, (state) => ({
        ...state,
        isLoadingOneLoc: true,
        error: null,
    })),

    on(LocationActions.editLocationSuccess, (state, { location }) => ({
        ...state,
        oneLocation: location as Location,
        isLoadingOneLoc: false,
        error: null,
    })),

    on(LocationActions.editLocationFailure, (state, { error }) => ({
        ...state,
        isLoadingOneLoc: false,
        error: error
    })),

    on(LocationActions.loadLocationNames, state => ({ 
        ...state, 
        isLoadingLocNames: true, 
        error: null 
    })),

    on(LocationActions.loadLocationNamesSuccess, (state, { locationNames }) => ({
        ...state,
        locationNames: locationNames as Location[],
        isLoadingLocNames: false,
        error: null
    })),

    on(LocationActions.loadLocationNamesFailure, (state, { error }) => ({
        ...state,
        isLoadingLocNames: false,
        error: error
    })),

    on(LocationActions.deleteLocationSuccess, (state, { location }) => ({
        ...state,
        locations: state.locations.filter(location => location._id !== location._id),
    })),

    on(LocationActions.deleteLocationFailure, (state, { error }) => ({
        ...state,
        error: error,
    })),
)
