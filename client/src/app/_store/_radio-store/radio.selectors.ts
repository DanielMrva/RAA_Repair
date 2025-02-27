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

export const selectOneRadioOrg = createSelector(
    selectRadios,
    (state: RadioState) => state.oneRadio?.orgName
);

export const radioLoadingSelector = createSelector(
    selectRadios,
    (state: RadioState) => state.isLoadingOneRadio
);

export const manyRadiosLoadingSelector = createSelector(
    selectRadios,
    (state: RadioState) => state.isLoadingRadios
);

export const radioErrorSelector = createSelector(
    selectRadios,
    (state: RadioState) => state.error
);