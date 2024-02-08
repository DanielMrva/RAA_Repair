import { createReducer, on } from "@ngrx/store";
// imports of actions
import * as RadioActions from "./radio.actions";
import { Radio } from "@app/graphql/schemas";

export interface RadioState {
    oneRadio: Radio | null;
    radios: Radio[];
    error: string | null;
    isLoading: boolean;
};

export const initialState: RadioState = {
    oneRadio: null,
    radios: [],
    error: null,
    isLoading: false
};

export const radioReducer = createReducer(

    initialState,

    on(RadioActions.loadSerialRadio, (state) => ({
        ...state,
        isLoading: true,
        error: null,
    })),

    on(RadioActions.loadSerialRadioSuccess, (state, { radio }) => ({
        ...state,
        oneRadio: radio as Radio,
        isLoading: false,
        error: null,
    })),

    on(RadioActions.loadSerialRadioFailure, (state, { error }) => ({
        ...state,
        isLoading: false,
        error: error
    })),

    on(RadioActions.loadOneRadio, (state) => ({
        ...state,
        oneRadio: null,
        isLoading: true,
        error: null,
    })),

    on(RadioActions.loadOneRadioSuccess, (state, action ) => ({
        ...state,
        oneRadio: action.radio,
        isLoading: false,
        error: null,
    })),

    on(RadioActions.loadOneRadioFailure, (state, action) => ({
        ...state,
        oneRadio: null,
        isLoading: false,
        error: action.error
    })),

    on(RadioActions.loadAllRadios, (state) => ({
        ...state,
        isLoading: true,
        error: null,
    })),

    on(RadioActions.loadAllRadiosSuccess, (state, { radios }) => ({
        ...state,
        radios: radios as Radio[],
        isLoading: false,
        error: null,
    })),

    on(RadioActions.loadAllRadiosFailure, (state, { error }) => ({
        ...state,
        isLoading: false,
        error: error
    })),

    on(RadioActions.loadOrgRadios, (state) => ({
        ...state,
        isLoading: true,
        error: null,
    })),

    on(RadioActions.loadOrgRadiosSuccess, (state, { radios }) => ({
        ...state,
        radios: radios as Radio[],
        isLoading: false,
        error: null,
    })),

    on(RadioActions.loadOrgRadiosFailure, (state, { error }) => ({
        ...state,
        isLoading: false,
        error: error
    })),

    on(RadioActions.addRadio, (state) => ({
        ...state,
        isLoading: true,
        error: null,
    })),

    on(RadioActions.addRadioSuccess, (state, { radio }) => ({
        ...state,
        oneRadio: radio as Radio,
        isLoading: false,
        error: null,
    })),

    on(RadioActions.addRadioFailure, (state, { error }) => ({
        ...state,
        isLoading: false,
        error: error
    })),

    on(RadioActions.editRadio, (state) => ({
        ...state,
        isLoading: true,
        error: null,
    })),

    on(RadioActions.editRadioSuccess, (state, { radio }) => ({
        ...state,
        oneRadio: radio as Radio,
        isLoading: false,
        error: null,
    })),

    on(RadioActions.editRadioFailure, (state, { error }) => ({
        ...state,
        isLoading: false,
        error: error
    })),
)

