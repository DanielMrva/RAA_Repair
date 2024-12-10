import { createAction, props } from "@ngrx/store";
import { Part, UpdatePartFields, AddPartFields } from "@app/graphql/schemas";

export const loadOnePart = createAction(
    '[Part Page] Load One Part',
    props<{ partId: string}>()
);

export const loadOnePartSuccess = createAction(
    '[Part Service] Load One Part Successs',
    props<{ part: Part}>()
);

export const loadOnePartFailure = createAction(
    '[Part Service] Load One Part Failure',
    props<{ error: string}>()
);

export const loadAllParts = createAction('[Part Reports Page] Load All Parts');

export const loadAllPartsSuccess = createAction(
    '[Part Service] Load All Parts Success',
    props<{ parts: Part[] }>()    
);

export const loadAllPartsFailure = createAction(
    '[Part Service] Load All Parts Failure',
    props<{ error: string}>()
);

export const loadPartsByPnPd = createAction(
    '[Part Page] Load Part By Part Number, Part Name',
    props<{ partNumber: string, partDescription: string }>()
);

export const loadPartsByPnPdSuccess = createAction(
    '[Part Service] Load Part By Part Number, Part Name Success',
    props<{ partByNumDesc: Part[] }>()
);

export const loadPartsByPnPdFailure = createAction(
    '[Part Service] Load Part By Part Number, Part Name',
    props<{ error: string }>()
);

export const addPart = createAction(
    '[Add Part Page] Add Part',
    props<{ addPartFields: AddPartFields }>()
);

export const addPartSuccess = createAction(
    '[Part Service] Add Part Success',
    props<{ part?: Part}>()
);

export const addPartFailure = createAction(
    '[Part Service] Add Part Failure',
    props<{ error: string}>()
);

export const editPart = createAction(
    '[Edit Part Page] Edit Part',
    props<{ id: string,
            updates: UpdatePartFields
    }>()
);

export const editPartSuccess = createAction(
    '[Part Service] Edit Part Success',
    props<{ part?: Part }>()
);

export const editPartFailure = createAction(
    '[Part Service] Edit Part Failure',
    props<{ error: string}>()
);

export const loadPartNames = createAction(
    '[Part Name Dropdown] Load Part Names'
);

export const loadPartNamesSuccess = createAction(
    '[Part Service] Load Part Names Success',
    props<{ partNames?: Part[] }>()
);

export const loadPartNamesFailure = createAction(
    '[Part Service] Load Part Names Failure',
    props<{ error: string }>()
);

export const deletePart = createAction(
    '[Part] Delete Part',
    props<{ id: string }>()
);

export const deletePartSuccess = createAction(
    '[Part] Delete Part Success',
    props<{ part?: Part }>()
);

export const deletePartFailure = createAction(
    '[Part] Delete Part Failure',
    props<{ error: any }>()
);