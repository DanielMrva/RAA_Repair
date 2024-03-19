import { createAction, props } from "@ngrx/store";
import { Repair, RepairFormFields } from "@app/graphql/schemas";

export const loadOneRepair = createAction(
    '[Repair Page] Load One Repair',
    props<{ repairID: string }>()
);

export const loadOneRepairSuccess = createAction(
    '[Repair Service] Load One Repair Successs',
    props<{ repair: Repair}>()
);

export const loadOneRepairFailure = createAction(
    '[Repair Service] Load One Repair Failure',
    props<{ error: string}>()
);

export const loadAllRepairs = createAction('[Repair Reports Page] Load All Repairs');

export const loadAllRepairsSuccess = createAction(
    '[Repair Service] Load All Repairs Success',
    props<{ repairs: Repair[] }>()    
);

export const loadAllRepairsFailure = createAction(
    '[Repair Service] Load All Repairs Failure',
    props<{ error: string}>()
);

export const addRepair = createAction(
    '[Add Repair Page] Add Repair',
    props<{ submittedRepair: RepairFormFields }>()
);

export const addRepairSuccess = createAction(
    '[Repair Service] Add Repair Success',
    props<{ repair?: Repair}>()
);

export const addRepairFailure = createAction(
    '[Repair Service] Add Repair Failure',
    props<{ error: string}>()
);

export const editRepair = createAction(
    '[Edit Repair Page] Edit Repair',
    props<{ id: string,
            updates: RepairFormFields
    }>()
);

export const editRepairSuccess = createAction(
    '[Repair Service] Edit Repair Success',
    props<{ repair?: Repair }>()
);

export const editRepairFailure = createAction(
    '[Repair Service] Edit Repair Failure',
    props<{ error: string}>()
);