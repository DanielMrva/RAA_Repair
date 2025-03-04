import { createReducer, on } from "@ngrx/store";
// imports of actions
import * as RepairActions from "./repair.actions";

import { Repair, statusType } from "@app/graphql/schemas";

export interface RepairState {
    oneRepair: Repair | null;
    repairs: Repair[];
    error: string | null;
    isLoadingOneRepair: boolean;
    isLoadingRepairs: boolean;
};

export const initialState: RepairState = {
    oneRepair: null,
    repairs: [],
    error: null,
    isLoadingOneRepair: false,
    isLoadingRepairs: false,
};

export const repairReducer = createReducer(

    initialState,

    on(RepairActions.loadOneRepair, (state) => ({
        ...state,
        isLoadingOneRepair: true,
        error: null,
    })),

    on(RepairActions.loadOneRepairSuccess, (state, { repair }) => ({
        ...state,
        oneRepair: repair as Repair,
        isLoadingOneRepair: false,
        error: null,
    })),

    on(RepairActions.loadOneRepairFailure, (state, { error }) => ({
        ...state,
        isLoadingOneRepair: false,
        error: error
    })),

    on(RepairActions.loadOrgRepairs, (state) => ({
        ...state,
        isLoadingRepairs: true,
        error: null,
    })),

    on(RepairActions.loadOrgRepairsSuccess, (state, { repairs }) => ({
        ...state,
        repairs: repairs as Repair[],
        isLoadingRepairs: false,
        error: null
    })),

    on(RepairActions.loadOrgRepairsFailure, (state, { error }) => ({
        ...state,
        isLoadingRepairs: false,
        error: error
    })),

    on(RepairActions.loadOrgLocRepairs, (state) => ({
        ...state,
        isLoadingRepairs: true,
        error: null,
    })),

    on(RepairActions.loadOrgLocRepairsSuccess, (state, { repairs }) => ({
        ...state,
        repairs: repairs as Repair[],
        isLoadingRepairs: false,
        error: null
    })),

    on(RepairActions.loadOrgLocRepairsFailure, (state, { error }) => ({
        ...state,
        isLoadingRepairs: false,
        error: error
    })),

    on(RepairActions.loadAllRepairs, (state) => ({
        ...state,
        isLoadingRepairs: true,
        error: null,
    })),

    on(RepairActions.loadAllRepairsSuccess, (state, { repairs }) => ({
        ...state,
        repairs: repairs as Repair[],
        isLoadingRepairs: false,
        error: null,
    })),

    on(RepairActions.loadAllRepairsFailure, (state, { error }) => ({
        ...state,
        isLoadingRepairs: false,
        error: error
    })),

    on(RepairActions.loadRepairByTag, (state) => ({
        ...state,
        isLoadingOneRepair: true,
        error: null,
    })),

    on(RepairActions.loadRepairByTagSuccess, (state, { repairs }) => ({
        ...state,
        isLoadingOneRepair: false,
        repairs: repairs as Repair[],
        error: null,
    })),

    on(RepairActions.loadRepairByTagFailure, (state, { error }) => ({
        ...state,
        isLoadingOneRepair: false,
        error: error,
    })),

    on(RepairActions.addRepair, (state) => ({
        ...state,
        isLoadingOneRepair: true,
        error: null,
    })),

    on(RepairActions.addRepairSuccess, (state, { repair }) => ({
        ...state,
        oneRepair: repair as Repair,
        isLoadingOneRepair: false,
        error: null,
    })),

    on(RepairActions.addRepairFailure, (state, { error }) => ({
        ...state,
        isLoadingOneRepair: false,
        error: error
    })),

    on(RepairActions.editRepair, (state) => ({
        ...state,
        isLoadingOneRepair: true,
        error: null,
    })),

    on(RepairActions.editRepairSuccess, (state, { repair }) => ({
        ...state,
        oneRepair: repair as Repair,
        isLoadingOneRepair: false,
        error: null,
    })),

    on(RepairActions.editRepairFailure, (state, { error }) => ({
        ...state,
        isLoadingOneRepair: false,
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
