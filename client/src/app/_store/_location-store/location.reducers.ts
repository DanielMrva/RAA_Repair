import { createReducer, on } from "@ngrx/store";
// import of actions
import * as LocationActions from "./location.actions";
import { Location } from "@app/graphql/schemas";

export interface LocationState {
    oneLocation: Location | null;
    locations: Location[];
    locationNames: Location[];
    error: string | null;
    isLoading: boolean;
};

export const initialState: LocationState = {
    oneLocation: null,
    locations: [],
    locationNames: [],
    error: null,
    isLoading: false
};

export const locationReducer = createReducer(
    initialState,

    on(LocationActions.loadOneLocation, (state) => ({
        ...state,
        oneLocation: null,
        isLoading: true,
        error: null,
    })),

    on(LocationActions.loadOneLocationSuccess, (state, action ) => ({
        ...state,
        oneLocation: action.location,
        isLoading: false,
        error: null,
    })),

    on(LocationActions.loadOneLocationFailure, (state, action) => ({
        ...state,
        oneLocation: null,
        isLoading: false,
        error: action.error
    })),

    on(LocationActions.loadLocationByName, (state) => ({
        ...state,
        oneLocation: null,
        isLoading: true,
        error: null,
    })),

    on(LocationActions.loadLocationByNameSuccess, (state, { oneLocation } ) => ({
        ...state,
        oneLocation: oneLocation,
        isLoading: false,
        error: null,
    })),

    on(LocationActions.loadLocationByNameFailure, (state, action) => ({
        ...state,
        oneLocation: null,
        isLoading: false,
        error: action.error
    })),

    on(LocationActions.loadAllLocations, (state) => ({
        ...state,
        isLoading: true,
        error: null,
    })),

    on(LocationActions.loadAllLocationsSuccess, (state, { locations }) => ({
        ...state,
        locations: locations as Location[],
        isLoading: false,
        error: null,
    })),

    on(LocationActions.loadAllLocationsFailure, (state, { error }) => ({
        ...state,
        isLoading: false,
        error: error
    })),

    on(LocationActions.loadOrgLocations, (state) => ({
        ...state,
        isLoading: true,
        error: null,
    })),

    on(LocationActions.loadOrgLocationsSuccess, (state, { locations }) => ({
        ...state,
        locations: locations as Location[],
        isLoading: false,
        error: null,
    })),

    on(LocationActions.loadOrgLocationsFailure, (state, { error }) => ({
        ...state,
        isLoading: false,
        error: error
    })),

    on(LocationActions.addLocation, (state) => ({
        ...state,
        isLoading: true,
        error: null,
    })),

    on(LocationActions.addLocationSuccess, (state, { location }) => ({
        ...state,
        oneLocation: location as Location,
        isLoading: false,
        error: null,
    })),

    on(LocationActions.addLocationFailure, (state, { error }) => ({
        ...state,
        isLoading: false,
        error: error
    })),

    on(LocationActions.editLocation, (state) => ({
        ...state,
        isLoading: true,
        error: null,
    })),

    on(LocationActions.editLocationSuccess, (state, { location }) => ({
        ...state,
        oneLocation: location as Location,
        isLoading: false,
        error: null,
    })),

    on(LocationActions.editLocationFailure, (state, { error }) => ({
        ...state,
        isLoading: false,
        error: error
    })),

    on(LocationActions.loadLocationNames, state => ({ 
        ...state, 
        isLoading: true, 
        error: null 
    })),

    on(LocationActions.loadLocationNamesSuccess, (state, { locationNames }) => ({
        ...state,
        locationNames: locationNames as Location[],
        isLoading: false,
        error: null
    })),

    on(LocationActions.loadLocationNamesFailure, (state, { error }) => ({
        ...state,
        isLoading: false,
        error: error
    })),
)
