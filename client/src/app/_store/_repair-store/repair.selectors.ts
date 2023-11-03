import { createSelector } from "@ngrx/store";
import { AppState } from "../app.state";
import { RepairState } from "./repair.reducers";

export const selectRepairs = ( state: AppState ) => state.repair;

export const selectAllRepairs = createSelector(
    selectRepairs,
    (state: RepairState) => state.repairs
);

export const selectOneRepair = createSelector(
    selectRepairs,
    (state: RepairState) => state.oneRepair
);

export const repairErrorSelector = createSelector(
    selectRepairs,
    (state: RepairState) => state.error
);

export const repairLoadingSelector = createSelector(
    selectRepairs,
    (state: RepairState) => state.isLoading
);