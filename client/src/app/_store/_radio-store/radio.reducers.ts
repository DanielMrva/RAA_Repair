import { createReducer, on } from "@ngrx/store";
// imports of actions
import * as RadioActions from "./radio.actions"
import { Radio, statusType } from "@app/graphql/schemas";

export interface RadioState {
    oneRadio: Radio | null;
    radios: Radio[];
    error: string | null;
    status: 'pending' | 'loading' | 'error' | 'success';
};

export const initialState: RadioState = {
    oneRadio: null,
    radios: [],
    error: null,
    status: 'pending'
};

export const radioReducer = createReducer(

    initialState,

    on(RadioActions.loadSerialRadio, (state) => ({
        ...state,
        status: "loading" as statusType,
        error: null,
    })),

    on(RadioActions.loadSerialRadioSuccess, (state, { radio }) => ({
        ...state,
        oneRadio: radio as Radio,
        status: 'success' as statusType,
        error: null,
    })),

    on(RadioActions.loadSerialRadioFailure, (state, { error }) => ({
        ...state,
        status: 'error' as statusType,
        error: error
    })),

    on(RadioActions.loadOneRadio, (state) => ({
        ...state,
        status: "loading" as statusType,
        error: null,
    })),

    on(RadioActions.loadOneRadioSuccess, (state, { radio }) => ({
        ...state,
        oneRadio: radio as Radio,
        status: 'success' as statusType,
        error: null,
    })),

    on(RadioActions.loadOneRadioFailure, (state, { error }) => ({
        ...state,
        status: 'error' as statusType,
        error: error
    })),

    on(RadioActions.loadAllRadios, (state) => ({
        ...state,
        status: "loading" as statusType,
        error: null,
    })),

    on(RadioActions.loadAllRadiosSuccess, (state, { radios }) => ({
        ...state,
        radios: radios as Radio[],
        status: 'success' as statusType,
        error: null,
    })),

    on(RadioActions.loadAllRadiosFailure, (state, { error }) => ({
        ...state,
        status: 'error' as statusType,
        error: error
    })),

    on(RadioActions.loadOrgRadios, (state) => ({
        ...state,
        status: "loading" as statusType,
        error: null,
    })),

    on(RadioActions.loadOrgRadiosSuccess, (state, { radios }) => ({
        ...state,
        radios: radios as Radio[],
        status: 'success' as statusType,
        error: null,
    })),

    on(RadioActions.loadOrgRadiosFailure, (state, { error }) => ({
        ...state,
        status: 'error' as statusType,
        error: error
    })),

    on(RadioActions.addRadio, (state) => ({
        ...state,
        status: "loading" as statusType,
        error: null,
    })),

    on(RadioActions.addRadioSuccess, (state, { radio }) => ({
        ...state,
        oneRadio: radio as Radio,
        status: 'success' as statusType,
        error: null,
    })),

    on(RadioActions.addRadioFailure, (state, { error }) => ({
        ...state,
        status: 'error' as statusType,
        error: error
    })),

    on(RadioActions.editRadio, (state) => ({
        ...state,
        status: "loading" as statusType,
        error: null,
    })),

    on(RadioActions.editRadioSuccess, (state, { radio }) => ({
        ...state,
        oneRadio: radio as Radio,
        status: 'success' as statusType,
        error: null,
    })),

    on(RadioActions.editRadioFailure, (state, { error }) => ({
        ...state,
        status: 'error' as statusType,
        error: error
    })),
)

