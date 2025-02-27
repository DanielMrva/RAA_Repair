import { createReducer, on } from "@ngrx/store";
import * as PartActions from "./part.actions";
import { Part } from "@app/graphql/schemas";

export interface PartState {
    onePart: Part | null;
    parts: Part[];
    error: string | null;
    isLoadingOnePart: boolean;
    isLoadingParts: boolean;
};

export const initialState: PartState = {
    onePart: null,
    parts: [],
    error: null,
    isLoadingOnePart: false,
    isLoadingParts: false,
};

export const partReducer = createReducer(
    initialState,

    on(PartActions.loadOnePart, (state) => ({
        ...state,
        onePart: null,
        isLoadingOnePart: true,
        error: null,
    })),

    on(PartActions.loadOnePartSuccess, (state, action ) => ({
        ...state,
        onePart: action.part,
        isLoadingOnePart: false,
        error: null,
    })),

    on(PartActions.loadOnePartFailure, (state, action) => ({
        ...state,
        onePart: null,
        isLoadingOnePart: false,
        error: action.error
    })),

    on(PartActions.loadAllParts, (state) => ({
        ...state,
        isLoadingParts: true,
        error: null,
    })),

    on(PartActions.loadAllPartsSuccess, (state, { parts }) => ({
        ...state,
        parts: parts as Part[],
        isLoadingParts: false,
        error: null,
    })),

    on(PartActions.loadAllPartsFailure, (state, { error }) => ({
        ...state,
        isLoadingParts: false,
        error: error
    })),

    on(PartActions.loadPartsByPnPd, (state) => ({
        ...state,
        parts: [],
        isLoadingParts: true,
        error: null
    })),

    on(PartActions.loadPartsByPnPdSuccess, (state, action ) => ({
        ...state,
        parts: action.partByNumDesc,
        isLoadingParts: false,
        error: null,
    })),

    on(PartActions.loadPartsByPnPdFailure, (state, action) => ({
        ...state,
        parts: [],
        isLoadingParts: false,
        error: action.error
    })),

    on(PartActions.addPart, (state) => ({
        ...state,
        onePart: null,
        isLoadingOnePart: true,
        error: null,
    })),

    on(PartActions.addPartSuccess, (state, { part }) => ({
        ...state,
        onePart: part as Part,
        isLoadingOnePart: false,
        error: null,
    })),

    on(PartActions.addPartFailure, (state, { error }) => ({
        ...state,
        isLoadingOnePart: false,
        error: error
    })),

    on(PartActions.editPart, (state) => ({
        ...state,
        isLoadingOnePart: true,
        error: null,
    })),

    on(PartActions.editPartSuccess, (state, { part }) => ({
        ...state,
        onePart: part as Part,
        isLoadingOnePart: false,
        error: null,
    })),

    on(PartActions.editPartFailure, (state, { error }) => ({
        ...state,
        isLoadingOnePart: false,
        error: error
    })),

    on(PartActions.deletePartSuccess, (state, { part }) => ({
        ...state,
        parts: state.parts.filter(part => part._id !== part._id),
    })),

    on(PartActions.deletePartFailure, (state, { error }) => ({
        ...state,
        error: error,
    })),
)
