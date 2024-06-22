import { createAction, props } from "@ngrx/store";
import { Location, UpdateLocationFields } from "@app/graphql/schemas";

export const loadOneLocation = createAction(
    '[Location Page] Load One Location',
    props<{ locationId: string}>()
);

export const loadOneLocationSuccess = createAction(
    '[Location Service] Load One Location Successs',
    props<{ location: Location}>()
);

export const loadOneLocationFailure = createAction(
    '[Location Service] Load One Location Failure',
    props<{ error: string}>()
);

export const loadLocationByName = createAction(
    '[Location Page] Load Location By Name',
    props<{ locationName: string}>()
);

export const loadLocationByNameSuccess = createAction(
    '[Location Service] Load Location By Name Successs',
    props<{ locations: Location[]}>()
);

export const loadLocationByNameFailure = createAction(
    '[Location Service] Load Location By Name Failure',
    props<{ error: string}>()
);

export const loadAllLocations = createAction('[Location Reports Page] Load All Locations');

export const loadAllLocationsSuccess = createAction(
    '[Location Service] Load All Locations Success',
    props<{ locations: Location[] }>()    
);

export const loadAllLocationsFailure = createAction(
    '[Location Service] Load All Locations Failure',
    props<{ error: string}>()
);

export const loadOrgLocations = createAction(
    '[Org Locations Page] Load Org Locations',
    props<{ orgName: string}>()
);

export const loadOrgLocationsSuccess = createAction(
    '[Location Service] Load Org Locations Successs',
    props<{ locations: Location[]}>()
);

export const loadOrgLocationsFailure = createAction(
    '[Location Service] Load Org Locations Failure',
    props<{ error: string}>()
);

export const addLocation = createAction(
    '[Add Location Page] Add Location',
    props<{ 
        locationName: string
        orgName: string,
        street: string,
        suite: string,
        city: string,
        state: string,
        zip: string,
        country: string,
        phone: string,
        contactEmail: string,
        primaryContact: string
    }>()
);

export const addLocationSuccess = createAction(
    '[Location Service] Add Location Success',
    props<{ location?: Location}>()
);

export const addLocationFailure = createAction(
    '[Location Service] Add Location Failure',
    props<{ error: string}>()
);

export const editLocation = createAction(
    '[Edit Location Page] Edit Location',
    props<{ id: string,
            updates: UpdateLocationFields
    }>()
);

export const editLocationSuccess = createAction(
    '[Location Service] Edit Location Success',
    props<{ location?: Location }>()
);

export const editLocationFailure = createAction(
    '[Location Service] Edit Location Failure',
    props<{ error: string}>()
);

export const loadLocationNames = createAction(
    '[Location Name Dropdown] Load Location Names'
);

export const loadLocationNamesSuccess = createAction(
    '[Location Service] Load Location Names Success',
    props<{ locationNames?: Location[] }>()
);

export const loadLocationNamesFailure = createAction(
    '[Location Service] Load Location Names Failure',
    props<{ error: string }>()
);