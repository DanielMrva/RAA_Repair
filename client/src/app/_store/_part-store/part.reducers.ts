import { createReducer, on } from "@ngrx/store";
import * as PartActions from "./part.actions";
import { Part } from "@app/graphql/schemas";

export interface PartState {
    onePart: Part | null;
    parts: Part[];
    // partNames: Part[];
    error: string | null;
    isLoading: boolean;
};

export const initialState: PartState = {
    onePart: null,
    parts: [],
    // partNames: [],
    error: null,
    isLoading: false
};

export const partReducer = createReducer(
    initialState,

    on(PartActions.loadOnePart, (state) => ({
        ...state,
        onePart: null,
        isLoading: true,
        error: null,
    })),

    on(PartActions.loadOnePartSuccess, (state, action ) => ({
        ...state,
        onePart: action.part,
        isLoading: false,
        error: null,
    })),

    on(PartActions.loadOnePartFailure, (state, action) => ({
        ...state,
        onePart: null,
        isLoading: false,
        error: action.error
    })),

    on(PartActions.loadAllParts, (state) => ({
        ...state,
        isLoading: true,
        error: null,
    })),

    on(PartActions.loadAllPartsSuccess, (state, { parts }) => ({
        ...state,
        parts: parts as Part[],
        isLoading: false,
        error: null,
    })),

    on(PartActions.loadAllPartsFailure, (state, { error }) => ({
        ...state,
        isLoading: false,
        error: error
    })),

    on(PartActions.loadPartsByPnPd, (state) => ({
        ...state,
        parts: [],
        isLoading: true,
        error: null
    })),

    on(PartActions.loadPartsByPnPdSuccess, (state, action ) => ({
        ...state,
        parts: action.partByNumDesc,
        isLoading: false,
        error: null,
    })),

    on(PartActions.loadPartsByPnPdFailure, (state, action) => ({
        ...state,
        parts: [],
        isLoading: false,
        error: action.error
    })),

    on(PartActions.addPart, (state) => ({
        ...state,
        onePart: null,
        isLoading: true,
        error: null,
    })),

    on(PartActions.addPartSuccess, (state, { part }) => ({
        ...state,
        onePart: part as Part,
        isLoading: false,
        error: null,
    })),

    on(PartActions.addPartFailure, (state, { error }) => ({
        ...state,
        isLoading: false,
        error: error
    })),

    on(PartActions.editPart, (state) => ({
        ...state,
        isLoading: true,
        error: null,
    })),

    on(PartActions.editPartSuccess, (state, { part }) => ({
        ...state,
        onePart: part as Part,
        isLoading: false,
        error: null,
    })),

    on(PartActions.editPartFailure, (state, { error }) => ({
        ...state,
        isLoading: false,
        error: error
    })),

    // on(PartActions.loadPartNames, state => ({ 
    //     ...state, 
    //     isLoading: true, 
    //     error: null 
    // })),

    // on(PartActions.loadPartNamesSuccess, (state, { partNames }) => ({
    //     ...state,
    //     partNames: partNames as Part[],
    //     isLoading: false,
    //     error: null
    // })),

    // on(PartActions.loadPartNamesFailure, (state, { error }) => ({
    //     ...state,
    //     isLoading: false,
    //     error: error
    // })),

    on(PartActions.deletePartSuccess, (state, { part }) => ({
        ...state,
        parts: state.parts.filter(part => part._id !== part._id),
    })),

    on(PartActions.deletePartFailure, (state, { error }) => ({
        ...state,
        error: error,
    })),
)
