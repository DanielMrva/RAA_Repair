import { createReducer, on } from "@ngrx/store";
// imports of actions

export interface NavState {
    clickedRoute: string | null;
    routeParams: string | null;
    error: string | null;
    status: 'pending' | 'loading' | 'error' | 'success';
};

export const initialState: NavState = {
    clickedRoute: null,
    routeParams: null,
    error: null,
    status: 'pending'
}
