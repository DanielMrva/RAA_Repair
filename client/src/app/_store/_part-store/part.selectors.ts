import { createSelector } from "@ngrx/store";
import { AppState } from "../app.state";
import { PartState } from "./part.reducers";

export const selectParts = ( state: AppState ) => state.part;

export const selectAllParts = createSelector(
    selectParts,
    (state: PartState) => state.parts
);

export const selectOnePart = createSelector(
    selectParts,
    (state: PartState) => state.onePart
);

export const partLoadingSelector = createSelector(
    selectParts,
    (state: PartState) => state.isLoading
);

export const partErrorSelector = createSelector(
    selectParts,
    (state: PartState) => state.error
);