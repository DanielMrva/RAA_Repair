import { createReducer, on } from "@ngrx/store";
// imports of actions
import * as RepairActions from "./repair.actions";

import { Repair, statusType } from "@app/graphql/schemas";

export interface RepairState {
    oneRepair: Repair | null;
    repairs: Repair[];
    error: string | null;
    status: 'pending' | 'loading' | 'error' | 'success';
};

export const initialState: RepairState = {
    oneRepair: null,
    repairs: [],
    error: null,
    status: 'pending'
};

export const repairReducer = createReducer(

    initialState,

    on(RepairActions.loadOneRepair, (state) => ({
        ...state,
        status: "loading" as statusType,
        error: null,
    })),

    on(RepairActions.loadOneRepairSuccess, (state, { repair }) => ({
        ...state,
        oneRepair: repair as Repair,
        status: 'success' as statusType,
        error: null,
    })),

    on(RepairActions.loadOneRepairFailure, (state, { error }) => ({
        ...state,
        status: 'error' as statusType,
        error: error
    })),

    on(RepairActions.loadAllRepairs, (state) => ({
        ...state,
        status: "loading" as statusType,
        error: null,
    })),

    on(RepairActions.loadAllRepairsSuccess, (state, { repairs }) => ({
        ...state,
        Repairs: repairs as Repair[],
        status: 'success' as statusType,
        error: null,
    })),

    on(RepairActions.loadAllRepairsFailure, (state, { error }) => ({
        ...state,
        status: 'error' as statusType,
        error: error
    })),

    on(RepairActions.addRepair, (state) => ({
        ...state,
        status: "loading" as statusType,
        error: null,
    })),

    on(RepairActions.addRepairSuccess, (state, { repair }) => ({
        ...state,
        oneRepair: repair as Repair,
        status: 'success' as statusType,
        error: null,
    })),

    on(RepairActions.addRepairFailure, (state, { error }) => ({
        ...state,
        status: 'error' as statusType,
        error: error
    })),

    on(RepairActions.editRepair, (state) => ({
        ...state,
        status: "loading" as statusType,
        error: null,
    })),

    on(RepairActions.editRepairSuccess, (state, { repair }) => ({
        ...state,
        oneRepair: repair as Repair,
        status: 'success' as statusType,
        error: null,
    })),

    on(RepairActions.editRepairFailure, (state, { error }) => ({
        ...state,
        status: 'error' as statusType,
        error: error
    }))
)
