import { createReducer, on } from "@ngrx/store";
// imports of actions
import { Repair } from "@app/graphql/schemas";

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
}
