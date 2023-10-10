import { createSelector } from "@ngrx/store";
import { AppState } from "../app.state";
import { RadioState } from "./radio.reducers";

export const selectRadios = ( state: AppState ) => state.radio;

export const selectAllRadios = createSelector(
    selectRadios,
    (state: RadioState) => state.radios
);

export const selectOneRadio = createSelector(
    selectRadios,
    (state: RadioState) => state.oneRadio
);

export const radioStatusSelector = createSelector(
    selectRadios,
    (state: RadioState) => state.status
);

export const radioErrorSelector = createSelector(
    selectRadios,
    (state: RadioState) => state.error
);