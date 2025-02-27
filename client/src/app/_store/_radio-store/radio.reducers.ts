import { createReducer, on } from "@ngrx/store";
// imports of actions
import * as RadioActions from "./radio.actions";
import { Radio } from "@app/graphql/schemas";

export interface RadioState {
    oneRadio: Radio | null;
    radios: Radio[];
    error: string | null;
    isLoadingOneRadio: boolean;
    isLoadingRadios: boolean;
};

export const initialState: RadioState = {
    oneRadio: null,
    radios: [],
    error: null,
    isLoadingOneRadio: false,
    isLoadingRadios: false,
};

export const radioReducer = createReducer(

    initialState,

    on(RadioActions.loadSerialRadio, (state) => ({
        ...state,
        radios: [],
        isLoadingOneRadio: true,
        error: null,
    })),

    on(RadioActions.loadSerialRadioSuccess, (state, { serialRadio }) => ({
        ...state,
        oneRadio: serialRadio as Radio,
        isLoadingOneRadio: false,
        error: null,
    })),

    on(RadioActions.loadSerialRadioFailure, (state, { error }) => ({
        ...state,
        isLoadingOneRadio: false,
        error: error
    })),

    on(RadioActions.loadLikeSerialRadio, (state) => ({
        ...state,
        radios: [],
        isLoadingRadios: true,
        error: null,
    })),

    on(RadioActions.loadLikeSerialRadioSuccess, (state, { serialRadio }) => ({
        ...state,
        radios: serialRadio as Radio[],
        isLoadingRadios: false,
        error: null,
    })),

    on(RadioActions.loadLikeSerialRadioFailure, (state, { error }) => ({
        ...state,
        isLoadingRadios: false,
        error: error
    })),

    on(RadioActions.loadOneRadio, (state) => ({
        ...state,
        oneRadio: null,
        isLoadingOneRadio: true,
        error: null,
    })),

    on(RadioActions.loadOneRadioSuccess, (state, action ) => ({
        ...state,
        oneRadio: action.radio,
        isLoadingOneRadio: false,
        error: null,
    })),

    on(RadioActions.loadOneRadioFailure, (state, action) => ({
        ...state,
        oneRadio: null,
        isLoadingOneRadio: false,
        error: action.error
    })),

    on(RadioActions.loadAllRadios, (state) => ({
        ...state,
        radios: [],
        isLoadingRadios: true,
        error: null,
    })),

    on(RadioActions.loadAllRadiosSuccess, (state, { radios }) => ({
        ...state,
        radios: radios as Radio[],
        isLoadingRadios: false,
        error: null,
    })),

    on(RadioActions.loadAllRadiosFailure, (state, { error }) => ({
        ...state,
        isLoadingRadios: false,
        error: error
    })),

    on(RadioActions.loadOrgRadios, (state) => ({
        ...state,
        radios: [],
        isLoadingRadios: true,
        error: null,
    })),

    on(RadioActions.loadOrgRadiosSuccess, (state, { radios }) => ({
        ...state,
        radios: radios as Radio[],
        isLoadingRadios: false,
        error: null,
    })),

    on(RadioActions.loadOrgRadiosFailure, (state, { error }) => ({
        ...state,
        isLoadingRadios: false,
        error: error
    })),

    on(RadioActions.loadLikeOrgRadios, (state) => ({
        ...state,
        radios: [],
        isLoadingRadios: true,
        error: null,
    })),

    on(RadioActions.loadLikeOrgRadiosSuccess, (state, { radios }) => ({
        ...state,
        radios: radios as Radio[],
        isLoadingRadios: false,
        error: null,
    })),

    on(RadioActions.loadLikeOrgRadiosFailure, (state, { error }) => ({
        ...state,
        isLoadingRadios: false,
        error: error
    })),

    on(RadioActions.addRadio, (state) => ({
        ...state,
        isLoadingOneRadio: true,
        error: null,
    })),

    on(RadioActions.addRadioSuccess, (state, { radio }) => ({
        ...state,
        oneRadio: radio as Radio,
        isLoadingOneRadio: false,
        error: null,
    })),

    on(RadioActions.addRadioFailure, (state, { error }) => ({
        ...state,
        isLoadingOneRadio: false,
        error: error
    })),

    on(RadioActions.editRadio, (state) => ({
        ...state,
        isLoadingOneRadio: true,
        error: null,
    })),

    on(RadioActions.editRadioSuccess, (state, { radio }) => ({
        ...state,
        oneRadio: radio as Radio,
        isLoadingOneRadio: false,
        error: null,
    })),

    on(RadioActions.editRadioFailure, (state, { error }) => ({
        ...state,
        isLoadingOneRadio: false,
        error: error
    })),

    on(RadioActions.deleteRadioSuccess, (state, { radio }) => ({
        ...state,
        radios: state.radios.filter(radio => radio._id !== radio._id),
    })),

    on(RadioActions.deleteRadioFailure, (state, { error }) => ({
        ...state,
        error: error,
    })),
)

