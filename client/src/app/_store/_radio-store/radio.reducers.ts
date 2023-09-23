import { createReducer, on } from "@ngrx/store";
// imports of actions
import { Radio } from "@app/graphql/schemas";

export interface RadioState {
    oneRadio: Radio | null;
    Radios: Radio[];
    error: string | null;
    status: 'pending' | 'loading' | 'error' | 'sucess';
};

export const initialState: RadioState = {
    oneRadio: null,
    Radios: [],
    error: null,
    status: 'pending'
}
