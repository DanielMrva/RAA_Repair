import { createReducer, on } from "@ngrx/store";
import { setAuthInfo, clearAuthInfo } from "./auth.actions";
import { User, Auth } from "@app/graphql/schemas";

export interface AuthState {
    username: string | null;
    orgName: string | null;
    accessLevel: string | null;
    isAuthenticated: boolean;
    userLocation: string | null;
};

export const initialState: AuthState = {
    username: null,
    orgName: null,
    accessLevel: null,
    isAuthenticated: false,
    userLocation: null,
};

export const authReducer = createReducer(
    initialState,

    on(setAuthInfo, (state, { username, orgName, accessLevel, userLocation }) => ({
        ...state,
        username,
        orgName,
        accessLevel,
        isAuthenticated: true,
        userLocation
    })),

    on(clearAuthInfo, (state) => ({
        ...state,
        username: null,
        orgName: null,
        accessLevel: null,
        isAuthenticated: false,
        userLocation: null
    }))
)