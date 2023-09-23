import { createReducer, on } from "@ngrx/store";
// imports of actions
import { User } from "@app/graphql/schemas";

export interface AuthState {
    currentUser: User | null;
    loggedIn: boolean;
    accessLevel: 'admin' | 'tech' | 'user' | null;
};

export const initialState: AuthState = {
    currentUser: null,
    loggedIn: false,
    accessLevel: null
}