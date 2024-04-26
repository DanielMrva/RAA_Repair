import { createAction, props } from "@ngrx/store";
import { Radio, UpdateRadioFields } from "@app/graphql/schemas";

export const loadSerialRadio = createAction(
    '[Radio Page] Load Serial Radio',
    props<{ serialNumber: string, model: string}>()
);

export const loadSerialRadioSuccess = createAction(
    '[Radio Service] Load Serial Radio Successs',
    props<{ serialRadio: Radio}>()
);

export const loadSerialRadioFailure = createAction(
    '[Radio Service] Load Serial Radio Failure',
    props<{ error: string}>()
);

export const loadOneRadio = createAction(
    '[Radio Page] Load One Radio',
    props<{ radioID: string}>()
);

export const loadOneRadioSuccess = createAction(
    '[Radio Service] Load One Radio Successs',
    props<{ radio: Radio}>()
);

export const loadOneRadioFailure = createAction(
    '[Radio Service] Load One Radio Failure',
    props<{ error: string}>()
);

export const loadAllRadios = createAction('[Radio Reports Page] Load All Radios');

export const loadAllRadiosSuccess = createAction(
    '[Radio Service] Load All Radios Success',
    props<{ radios: Radio[] }>()    
);

export const loadAllRadiosFailure = createAction(
    '[Radio Service] Load All Radios Failure',
    props<{ error: string}>()
);

export const loadOrgRadios = createAction(
    '[Org Radios Page] Load Org Radios',
    props<{ orgName: string}>()
);

export const loadOrgRadiosSuccess = createAction(
    '[Radio Service] Load Org Radios Successs',
    props<{ radios: Radio[]}>()
);

export const loadOrgRadiosFailure = createAction(
    '[Radio Service] Load Org Radios Failure',
    props<{ error: string}>()
);

export const addRadio = createAction(
    '[Add Radio Page] Add Radio',
    props<{ 
        orgName: string,
        locationName: string,
        datePurchased: string,
        dateEntered: string,
        inventoryNumber: string,
        make: string,
        model: string,
        progChannels: string,
        notes: string[],
        serialNumber: string,
        warranty: string,
        refurb: boolean,
        radioType: string
    }>()
);

export const addRadioSuccess = createAction(
    '[Radio Service] Add Radio Success',
    props<{ radio?: Radio}>()
);

export const addRadioFailure = createAction(
    '[Radio Service] Add Radio Failure',
    props<{ error: string}>()
);

export const editRadio = createAction(
    '[Edit Radio Page] Edit Radio',
    props<{ id: string,
            updates: UpdateRadioFields
    }>()
);

export const editRadioSuccess = createAction(
    '[Radio Service] Edit Radio Success',
    props<{ radio?: Radio }>()
);

export const editRadioFailure = createAction(
    '[Radio Service] Edit Radio Failure',
    props<{ error: string}>()
);

