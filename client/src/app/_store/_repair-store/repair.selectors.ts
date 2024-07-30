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

export const selectActiveRepairs = createSelector(selectAllRepairs, repairs =>
  repairs.filter(repair => repair.repairStatus !== 'Radio sent to Customer')
);

export const selectIncomingRepairs = createSelector(selectAllRepairs, repairs =>
    repairs.filter(repair => (repair.dateRepairAdded && !repair.dateRecEuRaa) || (repair.dateSentEuRaa && !repair.dateRecEuRaa))
  );
  

export const selectRepairsAtRAA = createSelector(selectAllRepairs, repairs =>
  repairs.filter(
    repair => (repair.dateRecEuRaa && !repair.dateSentRaaTech) || (repair.dateRecTechRaa && !repair.dateSentRaaEu)
  )
);

export const selectRepairsAtTechnician = createSelector(selectAllRepairs, repairs =>
  repairs.filter(repair => repair.dateSentRaaTech && !repair.dateRecTechRaa)
);

export const selectCompleteRepairs = createSelector(selectAllRepairs, repairs =>
  repairs.filter(repair => repair.repairStatus === 'Radio sent to Customer' || repair.dateSentRaaEu)
);

export const selectRepairsAtLoction = createSelector(selectAllRepairs, repairs => 
  repairs.filter(repair => repair.dateRepairAdded && !repair.dateRecEuRaa)
);
