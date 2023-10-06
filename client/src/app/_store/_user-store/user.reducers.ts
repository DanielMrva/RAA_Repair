import { createReducer, on } from "@ngrx/store";
import { 
    loginUser, 
    loginUserSuccess,
    loginUserFailure,
    addUser,
    addUserSuccess,
    addUserFailure,
    loadUsers, 
    loadUsersSuccess, 
    loadUsersFailure,
    loadOneUser,
    loadOneUserSuccess,
    loadOneUserFailure,
    loadOrgUsers,
    loadOrgUsersSuccess,
    loadOrgUsersFailure,
    editUser,
    editUserSuccess,
    editUserFailure
} from "./user.actions";
import { User, statusType } from "@app/graphql/schemas";


export interface UserState {
    oneUser: User | null;
    users: User[];
    error: string | null;
    status: 'pending' | 'loading' | 'error' | 'success';
};

export const initialState: UserState = {
    oneUser: null,
    users: [],
    error: null,
    status: 'pending'
};

export const userReducer = createReducer(

    initialState,

    on(loginUser, state => ({ ...state, status: 'pending' as statusType, error: null,})),

    on(loginUserSuccess, (state, { loginResults }) => ({
        ...state,
        status: "success" as statusType,
        error: null
    })),

    on(loginUserFailure, (state, { error }) => ({
        ...state,
        status: "error" as statusType,
        error: error
    })),

    on(addUser, (state) => ({
        ...state,
        status: "loading" as statusType,
        error: null,

    })),

    on(addUserSuccess, (state, { user }) => ({
        ...state,
        oneUser: user as User,
        status: 'success' as statusType,
        error: null,
    })),

    on(addUserFailure, (state, { error }) => ({
        ...state,
        status: 'error' as statusType,
        error: error
    })),

    on(loadUsers, (state) => ({
        ...state,
        status: "loading" as statusType,
        error: null,
    })),

    on(loadUsersSuccess, (state, { users }) => ({
        ...state,
        users: users as User[],
        status: 'success' as statusType,
        error: null,
    })),

    on(loadUsersFailure, (state, { error }) => ({
        ...state,
        status: 'error' as statusType,
        error: error
    })),

    on(loadOneUser, (state) => ({
        ...state,
        status: "loading" as statusType,
        error: null,

    })),

    on(loadOneUserSuccess, (state, { user }) => ({
        ...state,
        oneUser: user as User,
        status: 'success' as statusType,
        error: null,
    })),

    on(loadOneUserFailure, (state, { error }) => ({
        ...state,
        status: 'error' as statusType,
        error: error
    })),

    on(loadOrgUsers, (state) => ({
        ...state,
        status: "loading" as statusType,
        error: null,
    })),

    on(loadOrgUsersSuccess, (state, { users }) => ({
        ...state,
        users: users as User[],
        status: 'success' as statusType,
        error: null,
    })),

    on(loadOrgUsersFailure, (state, { error }) => ({
        ...state,
        status: 'error' as statusType,
        error: error
    })),

    on(editUser, (state) => ({
        ...state,
        status: 'loading' as statusType,
        error: null
    })),

    on(editUserSuccess, (state, { user }) => ({
        ...state,
        oneUser: user as User,
        status: 'success' as statusType,
        error: null
    })),

    on(editUserFailure, (state, { error }) => ({
        ...state,
        status: 'error' as statusType,
        error: error
    }))
)