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
    isLoading: boolean;
};

export const initialState: UserState = {
    oneUser: null,
    users: [],
    error: null,
    isLoading: false
};

export const userReducer = createReducer(

    initialState,

    on(loginUser, state => ({ ...state, isLoading: true, error: null,})),

    on(loginUserSuccess, (state, { login }) => ({
        ...state,
        isLoading: false,
        error: null
    })),

    on(loginUserFailure, (state, { error }) => ({
        ...state,
        isLoading: false,
        error: error
    })),

    on(addUser, (state) => ({
        ...state,
        isLoading: true,
        error: null,

    })),

    on(addUserSuccess, (state, { user }) => ({
        ...state,
        oneUser: user as User,
        isLoading: false,
        error: null,
    })),

    on(addUserFailure, (state, { error }) => ({
        ...state,
        isLoading: false,
        error: error
    })),

    on(loadUsers, (state) => ({
        ...state,
        isLoading: true,
        error: null,
    })),

    on(loadUsersSuccess, (state, { users }) => ({
        ...state,
        users: users as User[],
        isLoading: false,
        error: null,
    })),

    on(loadUsersFailure, (state, { error }) => ({
        ...state,
        isLoading: false,
        error: error
    })),

    on(loadOneUser, (state) => ({
        ...state,
        isLoading: true,
        error: null,

    })),

    on(loadOneUserSuccess, (state, { user }) => ({
        ...state,
        oneUser: user as User,
        isLoading: false,
        error: null,
    })),

    on(loadOneUserFailure, (state, { error }) => ({
        ...state,
        isLoading: false,
        error: error
    })),

    on(loadOrgUsers, (state) => ({
        ...state,
        isLoading: true,
        error: null,
    })),

    on(loadOrgUsersSuccess, (state, { users }) => ({
        ...state,
        users: users as User[],
        isLoading: false,
        error: null,
    })),

    on(loadOrgUsersFailure, (state, { error }) => ({
        ...state,
        isLoading: false,
        error: error
    })),

    on(editUser, (state) => ({
        ...state,
        isLoading: true,
        error: null
    })),

    on(editUserSuccess, (state, { user }) => ({
        ...state,
        oneUser: user as User,
        isLoading: false,
        error: null
    })),

    on(editUserFailure, (state, { error }) => ({
        ...state,
        isLoading: false,
        error: error
    }))
)