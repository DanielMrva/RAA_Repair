import { createReducer, on } from "@ngrx/store";
// imports of actions
import * as RepairActions from "./repair.actions";

import { Repair, statusType } from "@app/graphql/schemas";

export interface RepairState {
    oneRepair: Repair | null;
    repairs: Repair[];
    error: string | null;
    isLoading: boolean;
};

export const initialState: RepairState = {
    oneRepair: null,
    repairs: [],
    error: null,
    isLoading: false,
};

export const repairReducer = createReducer(

    initialState,

    on(RepairActions.loadOneRepair, (state) => ({
        ...state,
        isLoading: true,
        error: null,
    })),

    on(RepairActions.loadOneRepairSuccess, (state, { repair }) => ({
        ...state,
        oneRepair: repair as Repair,
        isLoading: false,
        error: null,
    })),

    on(RepairActions.loadOneRepairFailure, (state, { error }) => ({
        ...state,
        isLoading: false,
        error: error
    })),

    on(RepairActions.loadOrgRepairs, (state) => ({
        ...state,
        isLoading: true,
        error: null,
    })),

    on(RepairActions.loadOrgRepairsSuccess, (state, { repairs }) => ({
        ...state,
        repairs: repairs as Repair[],
        isLoading: false,
        error: null
    })),

    on(RepairActions.loadOrgRepairsFailure, (state, { error }) => ({
        ...state,
        isLoading: false,
        error: error
    })),

    on(RepairActions.loadAllRepairs, (state) => ({
        ...state,
        isLoading: true,
        error: null,
    })),

    on(RepairActions.loadAllRepairsSuccess, (state, { repairs }) => ({
        ...state,
        repairs: repairs as Repair[],
        isLoading: false,
        error: null,
    })),

    on(RepairActions.loadAllRepairsFailure, (state, { error }) => ({
        ...state,
        isLoading: false,
        error: error
    })),

    on(RepairActions.loadRepairByTag, (state) => ({
        ...state,
        isLoading: true,
        error: null,
    })),

    on(RepairActions.loadRepairByTagSuccess, (state, { repairs }) => ({
        ...state,
        isLoading: false,
        repairs: repairs as Repair[],
        error: null,
    })),

    on(RepairActions.loadRepairByTagFailure, (state, { error }) => ({
        ...state,
        isLoading: false,
        error: error,
    })),

    on(RepairActions.addRepair, (state) => ({
        ...state,
        isLoading: true,
        error: null,
    })),

    on(RepairActions.addRepairSuccess, (state, { repair }) => ({
        ...state,
        oneRepair: repair as Repair,
        isLoading: false,
        error: null,
    })),

    on(RepairActions.addRepairFailure, (state, { error }) => ({
        ...state,
        isLoading: false,
        error: error
    })),

    on(RepairActions.editRepair, (state) => ({
        ...state,
        isLoading: true,
        error: null,
    })),

    on(RepairActions.editRepairSuccess, (state, { repair }) => ({
        ...state,
        oneRepair: repair as Repair,
        isLoading: false,
        error: null,
    })),

    on(RepairActions.editRepairFailure, (state, { error }) => ({
        ...state,
        isLoading: false,
        error: error
    })),

    on(RepairActions.deleteRepairSuccess, (state, { repair }) => ({
        ...state,
        repairs: state.repairs.filter(repair => repair._id !== repair._id),
    })),

    on(RepairActions.deleteRepairFailure, (state, { error }) => ({
        ...state,
        error: error,
    })),
)
